import { useState } from 'react'
import './SampleMonitoringPage.css'

// ---------------------------------------------------------------------------
// Shared reference data — reused by every monitoring type built on this page
// ---------------------------------------------------------------------------

export const DISCHARGE_TYPES = ['صناعي', 'صحي', 'صناعي / صحي', 'زراعي']
export const SAMPLING_PURPOSES = ['رصد دوري', 'رد على شكوى', 'متابعة مخالفة سابقة', 'تفتيش مفاجئ']
export const POSITION_OPTIONS = ['مطابق', 'مخالف', 'تحت المتابعة']
export const NOTE_OPTIONS = ['مخطط', 'غير مخطط']
export const POLLUTION_SOURCES = ['صناعي', 'زراعي', 'صحي']

// Water-quality parameters — mirrors the lab results sheet.
// checkType controls how compliance is derived from the measured value:
//   'range' -> min <= value <= max
//   'min'   -> value >= min
//   'max'   -> value <= max
//   'none'  -> no legal limit, always recorded as compliant
export const DEFAULT_PARAMETERS = [
  { key: 'temperature', label: 'درجة الحرارة', unit: '°م', checkType: 'none', limitText: '--' },
  { key: 'ph', label: 'الأس الهيدروجيني', unit: 'pH', checkType: 'range', min: 6.5, max: 8.5, limitText: '8.5 – 6.5' },
  { key: 'dissolvedOxygen', label: 'الأكسجين الذائب', unit: 'ملجم/لتر', checkType: 'min', min: 6, limitText: 'لا يقل عن 6' },
  { key: 'cod', label: 'الأكسجين الكيميائي المستهلك', unit: 'ملجم/لتر', checkType: 'max', max: 10, limitText: '10' },
  { key: 'tds', label: 'مجموع المواد الصلبة الذائبة الكلية', unit: 'ملجم/لتر', checkType: 'max', max: 500, limitText: '500' },
  { key: 'oilsGrease', label: 'الزيوت والشحوم', unit: 'ملجم/لتر', checkType: 'max', max: 0.1, limitText: '0.1' },
  { key: 'fluorides', label: 'الفلوريدات', unit: 'ملجم/لتر', checkType: 'max', max: 0.5, limitText: '0.5' },
  { key: 'nitrates', label: 'النترات', unit: 'ملجم/لتر', checkType: 'max', max: 2, limitText: '2' },
  { key: 'phenols', label: 'الفينولات', unit: 'ملجم/لتر', checkType: 'max', max: 0.002, limitText: '0.002' }
]

function emptyState(fields) {
  const s = {}
  fields.forEach((f) => (s[f.name] = ''))
  return s
}

function emptyParamState(parameters) {
  const s = {}
  parameters.forEach((p) => (s[p.key] = ''))
  return s
}

// Resolves a numeric bound for a parameter. Most parameters carry a fixed
// min/max, but some (e.g. noise limits, which depend on the zone the
// inspector selects) instead reference a sibling site field via
// minFrom/maxFrom, so the legal limit is read from the current form values.
function resolveBound(param, key, siteValues) {
  if (param[key] !== undefined) return param[key]
  const fromField = param[`${key}From`]
  if (fromField) {
    const v = parseFloat(siteValues?.[fromField])
    return Number.isNaN(v) ? undefined : v
  }
  return undefined
}

function resolveLimitText(param, siteValues) {
  if (typeof param.limitText === 'function') return param.limitText(siteValues) || '—'
  return param.limitText
}

function evaluateParam(param, rawValue, siteValues) {
  const value = String(rawValue ?? '').trim()
  if (!value) return { hasValue: false, compliant: null }
  const num = parseFloat(value)
  if (Number.isNaN(num)) return { hasValue: true, compliant: null }

  const min = resolveBound(param, 'min', siteValues)
  const max = resolveBound(param, 'max', siteValues)

  switch (param.checkType) {
    case 'range':
      if (min === undefined || max === undefined) return { hasValue: true, compliant: null }
      return { hasValue: true, compliant: num >= min && num <= max }
    case 'min':
      if (min === undefined) return { hasValue: true, compliant: null }
      return { hasValue: true, compliant: num >= min }
    case 'max':
      if (max === undefined) return { hasValue: true, compliant: null }
      return { hasValue: true, compliant: num <= max }
    default:
      return { hasValue: true, compliant: true }
  }
}

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })
}

// ---------------------------------------------------------------------------
// SampleMonitoringPage
//
// A standalone form -> submit -> printable-report flow, with no surrounding
// department dashboard. Configure it per monitoring type via props instead
// of duplicating the whole flow for every type.
// ---------------------------------------------------------------------------

function SampleMonitoringPage({
  onBack,
  icon,
  title,
  desc,
  letterheadSubtitle,
  siteFields,
  parameters = DEFAULT_PARAMETERS,
  sequenceStorageKey = null
}) {
  const [view, setView] = useState('form') // 'form' | 'report'
  const [siteValues, setSiteValues] = useState(() => emptyState(siteFields))
  const [paramValues, setParamValues] = useState(() => emptyParamState(parameters))
  const [error, setError] = useState('')
  const [record, setRecord] = useState(null)

  const handleSiteChange = (name, value) => {
    setSiteValues((prev) => {
      const next = { ...prev, [name]: value }
      // Clear any select whose options depend on the field that just changed
      // (e.g. "اسم المنشأة" depends on "المحافظة") so a stale value from the
      // previous governorate can't linger.
      siteFields.forEach((f) => {
        if (f.dependsOn === name) next[f.name] = ''
      })
      return next
    })
  }

  const resolveOptions = (field) =>
    typeof field.options === 'function' ? field.options(siteValues) : field.options || []

  const handleParamChange = (key, value) => {
    setParamValues((prev) => ({ ...prev, [key]: value }))
  }

  const nextSequenceNumber = () => {
    if (!sequenceStorageKey) return null
    try {
      const current = parseInt(localStorage.getItem(sequenceStorageKey) || '0', 10) || 0
      const next = current + 1
      localStorage.setItem(sequenceStorageKey, String(next))
      return next
    } catch {
      return null
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const missingSite = siteFields.filter((f) => f.required && !String(siteValues[f.name]).trim())
    if (missingSite.length) {
      setError(`يرجى تعبئة الحقول المطلوبة: ${missingSite.map((f) => f.label).join('، ')}`)
      return
    }

    const results = parameters.map((p) => {
      const evalRes = evaluateParam(p, paramValues[p.key], siteValues)
      return { ...p, value: paramValues[p.key], limitText: resolveLimitText(p, siteValues), ...evalRes }
    })

    setError('')
    setRecord({
      seq: nextSequenceNumber(),
      site: siteValues,
      results,
      submittedAt: new Date().toISOString()
    })
    setView('report')
  }

  const handleNewSample = () => {
    setSiteValues(emptyState(siteFields))
    setParamValues(emptyParamState(parameters))
    setError('')
    setRecord(null)
    setView('form')
  }

  const handlePrint = () => {
    window.print()
  }

  // -------------------------------------------------------------- FORM VIEW
  if (view === 'form') {
    return (
      <div className="smp-page">
        <button className="hub-back" onClick={onBack} type="button">
          <i className="fa-solid fa-arrow-right"></i> رجوع لأنواع الرصد
        </button>

        <div className="smp-header">
          <div className="ph-icon sm">
            <i className={icon}></i>
          </div>
          <div>
            <h3>{title}</h3>
            <p className="ph-desc">{desc}</p>
          </div>
        </div>

        <form className="smp-form" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="form-error">
              <i className="fa-solid fa-triangle-exclamation"></i> {error}
            </div>
          )}

          <div className="smp-section">
            <h4 className="smp-section-title">بيانات الموقع والعينة</h4>
            <div className="form-grid">
              {siteFields.map((f) => (
                <div className={`form-field ${f.type === 'textarea' ? 'full' : ''}`} key={f.name}>
                  <label htmlFor={f.name}>
                    {f.label} {f.required && <span className="req">*</span>}
                  </label>

                  {f.type === 'select' ? (
                    <select
                      id={f.name}
                      value={siteValues[f.name]}
                      onChange={(e) => handleSiteChange(f.name, e.target.value)}
                      disabled={f.dependsOn && !siteValues[f.dependsOn]}
                    >
                      <option value="">
                        {f.dependsOn && !siteValues[f.dependsOn] ? 'اختر المحافظة أولاً...' : 'اختر...'}
                      </option>
                      {resolveOptions(f).map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : f.type === 'textarea' ? (
                    <textarea
                      id={f.name}
                      rows={3}
                      value={siteValues[f.name]}
                      onChange={(e) => handleSiteChange(f.name, e.target.value)}
                      placeholder={f.placeholder || ''}
                    />
                  ) : (
                    <input
                      id={f.name}
                      type={f.type}
                      step={f.step}
                      value={siteValues[f.name]}
                      onChange={(e) => handleSiteChange(f.name, e.target.value)}
                      placeholder={f.placeholder || ''}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="smp-section">
            <h4 className="smp-section-title">نتيجة تحليل العينة</h4>
            <div className="params-table-wrap">
              <table className="params-table">
                <thead>
                  <tr>
                    <th>مؤشر القياس</th>
                    <th>قيمة التركيز</th>
                    <th>حدود القانون</th>
                  </tr>
                </thead>
                <tbody>
                  {parameters.map((p) => (
                    <tr key={p.key}>
                      <td className="param-label">{p.label}</td>
                      <td>
                        <input
                          type="number"
                          step="any"
                          value={paramValues[p.key]}
                          onChange={(e) => handleParamChange(p.key, e.target.value)}
                          placeholder={p.unit}
                        />
                      </td>
                      <td className="param-limit">{resolveLimitText(p, siteValues)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-gold">
              <i className="fa-solid fa-floppy-disk"></i> حفظ وعرض التقرير
            </button>
          </div>
        </form>
      </div>
    )
  }

  // ------------------------------------------------------------ REPORT VIEW
  const overallCompliant = record.results.every((r) => r.compliant !== false)

  return (
    <div className="smp-page">
      <div className="report-toolbar no-print">
        <button className="hub-back" onClick={onBack} type="button">
          <i className="fa-solid fa-arrow-right"></i> رجوع لأنواع الرصد
        </button>
        <div className="report-toolbar-actions">
          <button className="btn-outline" type="button" onClick={handleNewSample}>
            <i className="fa-solid fa-plus"></i> تسجيل عينة جديدة
          </button>
          <button className="btn-gold" type="button" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> طباعة التقرير
          </button>
        </div>
      </div>

      <div className="print-area">
        <div className="report-letterhead">
          <div>
            <h3>جهاز شئون البيئة</h3>
            <p className="ph-desc">{letterheadSubtitle}</p>
          </div>
          <span className={`badge lg ${overallCompliant ? 'green' : 'red'}`}>
            {overallCompliant ? 'مطابق للحدود القانونية' : 'تجاوز الحدود القانونية'}
          </span>
        </div>

        <div className="smp-section">
          <h4 className="smp-section-title">بيانات الموقع والعينة</h4>
          <div className="report-info-grid">
            {record.seq !== null && record.seq !== undefined && (
              <div className="report-info-item">
                <span className="info-label">م</span>
                <span className="info-value">{record.seq}</span>
              </div>
            )}
            {siteFields.map((f) => (
              <div className="report-info-item" key={f.name}>
                <span className="info-label">{f.label}</span>
                <span className="info-value">
                  {f.type === 'date' ? formatDate(record.site[f.name]) : record.site[f.name] || '—'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="smp-section">
          <h4 className="smp-section-title">نتيجة العينات</h4>
          <div className="params-table-wrap">
            <table className="params-table results-table">
              <thead>
                <tr>
                  <th>مؤشر القياس</th>
                  <th>قيم التركيز</th>
                  <th>النتيجة</th>
                  <th>حدود القانون</th>
                </tr>
              </thead>
              <tbody>
                {record.results.map((r) => (
                  <tr key={r.key}>
                    <td className="param-label">{r.label}</td>
                    <td>{r.hasValue ? `${r.value} ${r.unit}` : '—'}</td>
                    <td>
                      {r.compliant === null ? (
                        <span className="badge amber">لم تسجل</span>
                      ) : (
                        <span className={`badge ${r.compliant ? 'green' : 'red'}`}>
                          {r.compliant ? 'مطابق' : 'غير مطابق'}
                        </span>
                      )}
                    </td>
                    <td className="param-limit">{r.limitText}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="report-footer">
          <span>تاريخ إصدار التقرير: {formatDate(record.submittedAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default SampleMonitoringPage

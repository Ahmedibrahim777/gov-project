import { useState } from 'react'

function emptyStateFromFields(fields) {
  const state = {}
  fields.forEach((f) => {
    state[f.name] = ''
  })
  return state
}

function MonitoringForm({ fields, onSubmit }) {
  const [values, setValues] = useState(() => emptyStateFromFields(fields))
  const [error, setError] = useState('')
  const [successTick, setSuccessTick] = useState(false)

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const missing = fields.filter((f) => f.required && !String(values[f.name]).trim())
    if (missing.length) {
      setError(`يرجى تعبئة الحقول المطلوبة: ${missing.map((f) => f.label).join('، ')}`)
      setSuccessTick(false)
      return
    }
    setError('')
    onSubmit(values)
    setValues(emptyStateFromFields(fields))
    setSuccessTick(true)
    setTimeout(() => setSuccessTick(false), 2500)
  }

  return (
    <form className="monitoring-form" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="form-error">
          <i className="fa-solid fa-triangle-exclamation"></i> {error}
        </div>
      )}
      {successTick && (
        <div className="form-success">
          <i className="fa-solid fa-circle-check"></i> تم تسجيل البيانات بنجاح
        </div>
      )}

      <div className="form-grid">
        {fields.map((f) => (
          <div className={`form-field ${f.type === 'textarea' ? 'full' : ''}`} key={f.name}>
            <label htmlFor={f.name}>
              {f.label} {f.required && <span className="req">*</span>}
            </label>

            {f.type === 'select' ? (
              <select id={f.name} value={values[f.name]} onChange={(e) => handleChange(f.name, e.target.value)}>
                <option value="">اختر...</option>
                {f.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea
                id={f.name}
                rows={3}
                value={values[f.name]}
                onChange={(e) => handleChange(f.name, e.target.value)}
                placeholder={f.placeholder || ''}
              />
            ) : (
              <input
                id={f.name}
                type={f.type}
                step={f.step}
                value={values[f.name]}
                onChange={(e) => handleChange(f.name, e.target.value)}
                placeholder={f.placeholder || ''}
              />
            )}
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-gold">
          <i className="fa-solid fa-floppy-disk"></i> حفظ وتسجيل
        </button>
      </div>
    </form>
  )
}

export default MonitoringForm

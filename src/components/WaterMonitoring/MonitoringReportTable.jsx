import { getRecordStatus } from '../../data/waterMonitoringTypes.js'

function toCsvValue(v) {
  const s = String(v ?? '')
  return `"${s.replace(/"/g, '""')}"`
}

function MonitoringReportTable({ type, records, onDelete }) {
  const columns = type.tableColumns

  const handleExport = () => {
    const headers = [...columns.map((c) => c.label), 'الحالة']
    const rows = records.map((r) => {
      const status = getRecordStatus(type.id, r)
      return [...columns.map((c) => r[c.key]), status.text]
    })
    const csv = [headers, ...rows].map((row) => row.map(toCsvValue).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${type.id}-report.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>سجل البلاغات والتقارير ({records.length})</h3>
        <button className="btn-outline sm" onClick={handleExport} disabled={!records.length}>
          <i className="fa-solid fa-file-export"></i> تصدير CSV
        </button>
      </div>
      <div className="panel-body" style={{ overflowX: 'auto' }}>
        {records.length === 0 ? (
          <div className="empty-state">
            <i className="fa-regular fa-folder-open"></i>
            لا توجد سجلات مسجلة بعد. استخدم النموذج أعلاه لإضافة أول سجل.
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
                <th>الحالة</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => {
                const status = getRecordStatus(type.id, r)
                return (
                  <tr key={r.id}>
                    {columns.map((c) => (
                      <td key={c.key}>{r[c.key] || '—'}</td>
                    ))}
                    <td>
                      <span className={`badge ${status.tone}`}>{status.text}</span>
                    </td>
                    <td>
                      <button className="row-delete" onClick={() => onDelete(r.id)} title="حذف السجل">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default MonitoringReportTable

import { useState, useEffect, useCallback } from 'react'
import './MainContent.css'
import MonitoringHub from './WaterMonitoring/MonitoringHub.jsx'

function MainContent({ department: d }) {
  const [hubFullPage, setHubFullPage] = useState(false)

  // Reset whenever the department changes, so switching departments never
  // leaves a stale department stuck in "full page" mode.
  useEffect(() => {
    setHubFullPage(false)
  }, [d?.id])

  const handleFullPageChange = useCallback((val) => {
    setHubFullPage(val)
  }, [])

  if (!d) return null

  return (
    <main className="main-content">
      <div className="fade-in" key={d.id}>
        <div className="breadcrumb">
          <span>الرئيسية</span>
          <i className="fa-solid fa-chevron-left"></i>
          <span className="current">{d.name}</span>
        </div>

        {!hubFullPage && (
          <>
            <div className="page-header">
              <div className="ph-left">
                <div className="ph-icon">
                  <i className={d.icon}></i>
                </div>
                <div>
                  <h2>{d.name}</h2>
                  <p className="ph-desc">{d.desc}</p>
                </div>
              </div>
              <div className="ph-actions">
                <button className="btn-outline">
                  <i className="fa-solid fa-file-export"></i> تصدير تقرير
                </button>
                <button className="btn-gold">
                  <i className="fa-solid fa-plus"></i> إجراء جديد
                </button>
              </div>
            </div>
          </>
        )}

        {d.hasMonitoringHub && <MonitoringHub onFullPageChange={handleFullPageChange} />}

        {!hubFullPage && (
          <>
            <div className="stat-grid">
              {d.stats.map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className="s-top">
                    <div className="s-ico">
                      <i className={s.icon}></i>
                    </div>
                    <span className={`s-trend ${s.trend}`}>
                      <i className={`fa-solid fa-arrow-${s.trend === 'up' ? 'up' : 'down'}`}></i> {s.trendVal}
                    </span>
                  </div>
                  <div className="s-value">{s.value}</div>
                  <div className="s-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="panel-grid">
              <div className="panel">
                <div className="panel-head">
                  <h3>{d.tableTitle}</h3>
                  <a href="#!" className="link">
                    عرض الكل
                  </a>
                </div>
                <div className="panel-body" style={{ overflowX: 'auto' }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        {d.tableCols.map((c, i) => (
                          <th key={i}>{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {d.tableRows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) =>
                            typeof cell === 'object' ? (
                              <td key={ci}>
                                <span className={`badge ${cell.tone}`}>{cell.text}</span>
                              </td>
                            ) : (
                              <td key={ci}>{cell}</td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="panel">
                <div className="panel-head">
                  <h3>آخر الأنشطة</h3>
                </div>
                <div className="panel-body">
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-dot">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                      </div>
                      <div>
                        <div className="a-title">تم تحديث بيانات {d.short}</div>
                        <div className="a-time">منذ ساعتين</div>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-dot">
                        <i className="fa-solid fa-user-check"></i>
                      </div>
                      <div>
                        <div className="a-title">تمت مراجعة طلب جديد</div>
                        <div className="a-time">أمس، 04:12 م</div>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-dot">
                        <i className="fa-solid fa-file-circle-check"></i>
                      </div>
                      <div>
                        <div className="a-title">اعتماد تقرير دوري</div>
                        <div className="a-time">قبل يومين</div>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-dot">
                        <i className="fa-solid fa-bell"></i>
                      </div>
                      <div>
                        <div className="a-title">تنبيه: مراجعة مطلوبة</div>
                        <div className="a-time">قبل 3 أيام</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar-section-label" style={{ margin: '26px 2px 0', color: 'var(--teal-800)' }}>
              إجراءات سريعة
            </div>
            <div className="quick-grid">
              {d.quick.map((q, i) => (
                <div className="quick-card" key={i}>
                  <div className="q-ico">
                    <i className={q.icon}></i>
                  </div>
                  <div className="q-title">{q.t}</div>
                  <div className="q-desc">{q.d}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default MainContent

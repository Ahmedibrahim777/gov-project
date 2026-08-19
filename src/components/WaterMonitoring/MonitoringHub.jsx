import { useState, useEffect } from 'react'
import monitoringTypes from '../../data/waterMonitoringTypes.js'
import MonitoringForm from './MonitoringForm.jsx'
import MonitoringReportTable from './MonitoringReportTable.jsx'
import NileRiverMonitoringPage from './NileRiverMonitoringPage.jsx'
import CanalsDrainsMonitoringPage from './CanalsDrainsMonitoringPage.jsx'
import SewageStationsMonitoringPage from './SewageStationsMonitoringPage.jsx'
import PowerStationsMonitoringPage from './PowerStationsMonitoringPage.jsx'
import NoiseMonitoringPage from './NoiseMonitoringPage.jsx'
import AirQualityMonitoringPage from './AirQualityMonitoringPage.jsx'
import './WaterMonitoring.css'

const STORAGE_PREFIX = 'envportal_monitoring_'

// Monitoring types that get a dedicated, standalone form+report page
// (no surrounding department dashboard) instead of the generic flow.
const FULL_PAGE_TYPES = new Set([
  'nile-river',
  'canals-drains',
  'sewage-stations',
  'power-stations',
  'noise',
  'air-quality'
])

const FULL_PAGE_COMPONENTS = {
  'nile-river': NileRiverMonitoringPage,
  'canals-drains': CanalsDrainsMonitoringPage,
  'sewage-stations': SewageStationsMonitoringPage,
  'power-stations': PowerStationsMonitoringPage,
  'noise': NoiseMonitoringPage,
  'air-quality': AirQualityMonitoringPage
}

function loadRecords(typeId) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + typeId)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveRecords(typeId, records) {
  try {
    localStorage.setItem(STORAGE_PREFIX + typeId, JSON.stringify(records))
  } catch {
    // storage may be unavailable (e.g. private browsing / quota) — fail silently
  }
}

function MonitoringHub({ onFullPageChange }) {
  const [activeTypeId, setActiveTypeId] = useState(null)
  const [records, setRecords] = useState([])

  useEffect(() => {
    if (activeTypeId) {
      setRecords(loadRecords(activeTypeId))
    }
  }, [activeTypeId])

  useEffect(() => {
    if (onFullPageChange) {
      onFullPageChange(FULL_PAGE_TYPES.has(activeTypeId))
    }
  }, [activeTypeId, onFullPageChange])

  const activeType = monitoringTypes.find((t) => t.id === activeTypeId)

  const handleAddRecord = (values) => {
    const newRecord = { id: `${Date.now()}`, ...values, createdAt: new Date().toISOString() }
    const updated = [newRecord, ...records]
    setRecords(updated)
    saveRecords(activeTypeId, updated)
  }

  const handleDeleteRecord = (id) => {
    const updated = records.filter((r) => r.id !== id)
    setRecords(updated)
    saveRecords(activeTypeId, updated)
  }

  if (activeTypeId && FULL_PAGE_TYPES.has(activeTypeId)) {
    const FullPageComponent = FULL_PAGE_COMPONENTS[activeTypeId]
    return <FullPageComponent onBack={() => setActiveTypeId(null)} />
  }

  if (activeType) {
    return (
      <div className="monitoring-hub fade-in">
        <button className="hub-back" onClick={() => setActiveTypeId(null)}>
          <i className="fa-solid fa-arrow-right"></i> رجوع لأنواع الرصد
        </button>

        <div className="monitoring-detail-header">
          <div className="ph-icon sm">
            <i className={activeType.icon}></i>
          </div>
          <div>
            <h3>{activeType.title}</h3>
            <p className="ph-desc">{activeType.desc}</p>
          </div>
        </div>

        <div className="panel monitoring-form-panel">
          <div className="panel-head">
            <h3>تسجيل بيانات جديدة</h3>
          </div>
          <div className="panel-body">
            <MonitoringForm fields={activeType.formFields} onSubmit={handleAddRecord} />
          </div>
        </div>

        <MonitoringReportTable type={activeType} records={records} onDelete={handleDeleteRecord} />
      </div>
    )
  }

  return (
    <div className="monitoring-hub">
      <div className="sidebar-section-label monitoring-hub-label">أنواع الرصد</div>
      <div className="monitoring-grid">
        {monitoringTypes.map((t) => (
          <button className="monitoring-card" key={t.id} onClick={() => setActiveTypeId(t.id)} type="button">
            <div className="mc-ico">
              <i className={t.icon}></i>
            </div>
            <div className="mc-title">{t.title}</div>
            <div className="mc-desc">{t.desc}</div>
            <div className="mc-cta">
              فتح النموذج والتقارير <i className="fa-solid fa-arrow-left"></i>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MonitoringHub

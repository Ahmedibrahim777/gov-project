import { useState } from 'react'
import Topbar from './Topbar.jsx'
import Sidebar from './Sidebar.jsx'
import MainContent from './MainContent.jsx'
import departments from '../data/departments.js'
import './Dashboard.css'

function Dashboard({ currentUser, onLogout }) {
  const [activeDeptId, setActiveDeptId] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeDept = departments.find((d) => d.id === activeDeptId)

  const handleSelectDept = (id) => {
    setActiveDeptId(id)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div id="dashboard-page" className="active">
      <Topbar currentUser={currentUser} onLogout={onLogout} onToggleSidebar={() => setSidebarOpen((o) => !o)} />

      {sidebarOpen && <div className="sidebar-backdrop show" onClick={() => setSidebarOpen(false)}></div>}

      <div className="layout">
        <Sidebar activeDeptId={activeDeptId} onSelect={handleSelectDept} isOpen={sidebarOpen} />
        <MainContent department={activeDept} />
      </div>
    </div>
  )
}

export default Dashboard

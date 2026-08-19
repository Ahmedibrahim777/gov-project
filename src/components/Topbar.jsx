import { useState } from 'react'
import logo from '../assets/logo.jpg'
import './Topbar.css'

function Topbar({ currentUser, onLogout, onToggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const initials = currentUser ? currentUser.trim().slice(0, 2) : 'مس'

  return (
    <div className="topbar">
      <div className="topbar-right">
        <button className="hamburger" aria-label="فتح القائمة" onClick={onToggleSidebar}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="topbar-logo">
          <img src={logo} alt="شعار الجهاز" />
        </div>
        <div className="topbar-titles">
          <span className="t1">جهاز شئون البيئة</span>
          <span className="t2">البوابة الإلكترونية الموحدة للإدارات</span>
        </div>
      </div>

      <div className="topbar-left">
        <button className="icon-btn" aria-label="البحث">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button className="icon-btn" aria-label="الإشعارات">
          <span className="dot"></span>
          <i className="fa-regular fa-bell"></i>
        </button>

        <div style={{ position: 'relative' }}>
          <button className="user-chip" onClick={() => setMenuOpen((o) => !o)}>
            <div className="avatar">{initials}</div>
            <div style={{ textAlign: 'right' }}>
              <div className="u-name">{currentUser || 'مستخدم'}</div>
              <div className="u-role">مسؤول نظام</div>
            </div>
            <i className="fa-solid fa-chevron-down"></i>
          </button>

          {menuOpen && (
            <div className="user-menu open" onMouseLeave={() => setMenuOpen(false)}>
              <button>
                <i className="fa-regular fa-id-badge"></i> الملف الشخصي
              </button>
              <button>
                <i className="fa-solid fa-gear"></i> الإعدادات
              </button>
              <button className="danger" onClick={onLogout}>
                <i className="fa-solid fa-right-from-bracket"></i> تسجيل الخروج
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Topbar

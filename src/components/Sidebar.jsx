import departments from '../data/departments.js'
import './Sidebar.css'

function Sidebar({ activeDeptId, onSelect, isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-section-label">الإدارات التسع</div>
      <ul className="nav-list">
        {departments.map((d) => (
          <li key={d.id}>
            <a
              href="#!"
              className={`nav-item ${d.id === activeDeptId ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                onSelect(d.id)
              }}
            >
              <span className="n-ico">
                <i className={d.icon}></i>
              </span>
              <span>{d.short}</span>
              <span className="n-num">{`0${d.id}`}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        الإصدار 1.0.0
        <br />
        © جهاز شئون البيئة — جمهورية مصر العربية
      </div>
    </aside>
  )
}

export default Sidebar

import { useState } from 'react'
import logo from '../assets/logo.jpg'
import './Login.css'

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('يرجى إدخال اسم المستخدم وكلمة المرور.')
      return
    }

    setLoading(true)

    // Simulated authentication — replace with a real API call to the backend.
    setTimeout(() => {
      setLoading(false)
      onLoginSuccess(username.trim())
    }, 900)
  }

  return (
    <div id="login-page">
      <div className="seal-pattern"></div>
      <div className="login-shell">
        <div className="login-brand">
          <span className="brand-eyebrow">جمهورية مصر العربية</span>
          <div className="brand-logo-ring">
            <img src={logo} alt="شعار وزارة التنمية المحلية والبيئة" />
          </div>
          <div className="brand-title">
            جهاز شئون البيئة
            <br />
            البوابة الإلكترونية الموحدة
          </div>
          <div className="brand-divider"></div>
          <p className="brand-sub">
            نظام إدارة الإدارات البيئية التسع — بيانات، تراخيص، متابعة ميدانية، وخدمات المواطنين في منصة واحدة آمنة.
          </p>
          <div className="brand-flagline">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="login-form-wrap">
          <h1>تسجيل الدخول إلى حسابك</h1>
          <p className="lede">يرجى إدخال اسم المستخدم وكلمة المرور الخاصة بك للوصول إلى لوحة التحكم.</p>

          {error && (
            <div className="login-error show">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="username">اسم المستخدم</label>
              <div className="input-wrap">
                <i className="fa-regular fa-user"></i>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="أدخل اسم المستخدم"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field" style={{ marginTop: '16px' }}>
              <label htmlFor="password">كلمة المرور</label>
              <div className="input-wrap">
                <i className="fa-solid fa-lock"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="أدخل كلمة المرور"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-pass"
                  aria-label="إظهار كلمة المرور"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  <i className={showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}></i>
                </button>
              </div>
            </div>

            <div className="field-row" style={{ marginTop: '14px' }}>
              <label className="remember">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                تذكرني
              </label>
              <a href="#!" className="forgot">
                هل نسيت كلمة المرور؟
              </a>
            </div>

            <button type="submit" className={`btn-login ${loading ? 'loading' : ''}`} style={{ width: '100%' }} disabled={loading}>
              <i className="fa-solid fa-spinner"></i>
              <span className="btn-label">
                <i className="fa-solid fa-right-to-bracket"></i>&nbsp; تسجيل الدخول
              </span>
            </button>
          </form>

          <p className="login-footnote">
            هذا النظام مخصص للاستخدام الرسمي من قبل موظفي جهاز شئون البيئة فقط.
            <br />
            جميع عمليات الدخول مسجلة ومراقبة لأغراض أمنية.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

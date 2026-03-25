import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function getInitials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map(p => p[0].toUpperCase()).join('')
}

function Field({ label, value, mono, accent }) {
  return (
    <div className="info-field">
      <div className="info-field-label">{label}</div>
      <div className={`info-field-value${mono ? ' mono' : ''}${accent ? ' accent' : ''}`}>
        {value || '—'}
      </div>
    </div>
  )
}

export default function UserDetail() {
  const { id } = useParams()
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(data => setUser(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        <Link to="/" className="header-brand">
          <div className="header-logo">BF</div>
          <span className="header-title">Buyer<span>ForeSight</span></span>
        </Link>
        <span className="header-badge">USER DETAIL</span>
      </header>

      <main className="main">
        {/* Back button */}
        <Link to="/" className="back-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Directory
        </Link>

        {loading && (
          <div className="loading-wrap">
            <div className="spinner" />
            <p>Loading user…</p>
          </div>
        )}

        {error && (
          <div className="error-wrap">
            <h3>User not found</h3>
            <p>{error}</p>
            <Link to="/" className="btn-retry" style={{textDecoration:'none', display:'inline-block'}}>
              ← Return to Directory
            </Link>
          </div>
        )}

        {user && (
          <div className="detail-layout">
            {/* ── Left: Profile Card ── */}
            <aside className="profile-card">
              <div className="profile-avatar-large">{getInitials(user.name)}</div>
              <div className="profile-name">{user.name}</div>
              <div className="profile-username">@{user.username}</div>

              <div className="profile-divider" />

              <div className="profile-meta-item">
                <svg className="profile-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <div>
                  <div className="profile-meta-label">Email</div>
                  <div className="profile-meta-text">{user.email}</div>
                </div>
              </div>

              <div className="profile-meta-item">
                <svg className="profile-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <div>
                  <div className="profile-meta-label">Phone</div>
                  <div className="profile-meta-text">{user.phone}</div>
                </div>
              </div>

              <div className="profile-meta-item">
                <svg className="profile-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <div>
                  <div className="profile-meta-label">Website</div>
                  <div className="profile-meta-text">
                    <a href={`https://${user.website}`} target="_blank" rel="noreferrer"
                      style={{color:'var(--accent)', textDecoration:'none'}}>
                      {user.website}
                    </a>
                  </div>
                </div>
              </div>

              <div className="profile-divider" />

              {/* ID badge */}
              <div style={{
                background:'var(--accent-lo)',
                border:'1px solid var(--accent-glow)',
                borderRadius:'6px',
                padding:'6px 14px',
                fontFamily:'var(--font-mono)',
                fontSize:'0.7rem',
                color:'var(--accent)',
                letterSpacing:'0.06em',
                width:'100%',
                textAlign:'center'
              }}>
                USER ID · {String(user.id).padStart(4, '0')}
              </div>
            </aside>

            {/* ── Right: Detail Sections ── */}
            <div className="detail-sections">

              {/* Personal Info */}
              <section className="detail-section">
                <div className="section-header">
                  <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span className="section-title">Personal Information</span>
                </div>
                <div className="section-body">
                  <Field label="Full Name"  value={user.name} />
                  <Field label="Username"   value={`@${user.username}`} mono />
                  <Field label="Email"      value={user.email} mono />
                  <Field label="Phone"      value={user.phone} mono />
                  <Field label="Website"    value={user.website} mono accent />
                </div>
              </section>

              {/* Address */}
              <section className="detail-section">
                <div className="section-header">
                  <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="section-title">Address</span>
                </div>
                <div className="section-body">
                  <Field label="Street"  value={user.address.street} />
                  <Field label="Suite"   value={user.address.suite} />
                  <Field label="City"    value={user.address.city} />
                  <Field label="Zipcode" value={user.address.zipcode} mono />
                  <div className="info-field">
                    <div className="info-field-label">Coordinates</div>
                    <div className="info-field-value mono">
                      {user.address.geo.lat}, {user.address.geo.lng}
                    </div>
                    <a
                      className="map-link"
                      href={`https://maps.google.com/?q=${user.address.geo.lat},${user.address.geo.lng}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      View on Maps
                    </a>
                  </div>
                </div>
              </section>

              {/* Company */}
              <section className="detail-section">
                <div className="section-header">
                  <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                  <span className="section-title">Company</span>
                </div>
                <div className="section-body">
                  <Field label="Company Name" value={user.company.name} accent />
                  <Field label="Catch Phrase" value={user.company.catchPhrase} />
                  <Field label="BS"           value={user.company.bs} mono />
                </div>
              </section>

            </div>
          </div>
        )}
      </main>
    </div>
  )
}

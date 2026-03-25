import { useNavigate } from 'react-router-dom'

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0].toUpperCase())
    .join('')
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function SortIcon({ active, dir }) {
  if (!active) return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" opacity="0.35">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  )
  return dir === 'asc'
    ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
}

export default function UserTable({ users, sortKey, sortDir, onSort, totalCount }) {
  const navigate = useNavigate()

  const handleSort = (key) => {
    if (sortKey === key) {
      onSort(key, sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      onSort(key, 'asc')
    }
  }

  if (users.length === 0) {
    return (
      <div className="table-wrap">
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <h3>No users found</h3>
          <p>Try adjusting your search query.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="table-wrap">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th
                className={sortKey === 'name' ? 'sort-active' : ''}
                onClick={() => handleSort('name')}
              >
                <div className="th-inner">
                  <SortIcon active={sortKey === 'name'} dir={sortDir} />
                  Name
                </div>
              </th>
              <th>Email</th>
              <th>Phone</th>
              <th
                className={sortKey === 'company' ? 'sort-active' : ''}
                onClick={() => handleSort('company')}
              >
                <div className="th-inner">
                  <SortIcon active={sortKey === 'company'} dir={sortDir} />
                  Company
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
                <td>
                  <div className="cell-name">
                    <div className="avatar">{getInitials(user.name)}</div>
                    <div className="cell-name-text">
                      <div className="name">{user.name}</div>
                      <div className="username">@{user.username}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="cell-email">{user.email}</span>
                </td>
                <td>
                  <span className="cell-phone">{user.phone}</span>
                </td>
                <td>
                  <div className="cell-company">
                    <div className="company-name">{user.company.name}</div>
                    <div className="catchphrase">{user.company.catchPhrase}</div>
                  </div>
                </td>
                <td className="cell-arrow"><ChevronRight /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span>Showing <b>{users.length}</b> of <b>{totalCount}</b> users</span>
      </div>
    </div>
  )
}

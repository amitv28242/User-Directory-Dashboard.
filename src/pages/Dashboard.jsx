import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUsers, useFilteredUsers } from '../hooks/useUsers.js'
import SearchBar from '../components/SearchBar.jsx'
import SortControls from '../components/SortControls.jsx'
import UserTable from '../components/UserTable.jsx'

export default function Dashboard() {
  const { users, loading, error, refetch } = useUsers()
  const [search,  setSearch]  = useState('')
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')

  const filtered = useFilteredUsers(users, search, sortKey, sortDir)

  const handleSort = (key, dir) => {
    setSortKey(key)
    setSortDir(dir)
  }

  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="header-brand">
          <div className="header-logo">BF</div>
          <span className="header-title">Buyer<span>ForeSight</span></span>
        </Link>
        <span className="header-badge">USER DIRECTORY</span>
      </header>

      <main className="main">
        <div className="page-header">
          <div className="page-header-left">
            <h1>User Directory</h1>
            <p>Browse, search, and inspect all registered users.</p>
          </div>
          <div className="stat-chips">
            <div className="stat-chip">
              <div className="stat-num">{users.length}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-chip">
              <div className="stat-num">{filtered.length}</div>
              <div className="stat-label">Shown</div>
            </div>
          </div>
        </div>

        <div className="controls-bar">
          <SearchBar value={search} onChange={setSearch} />
          <SortControls sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
        </div>

        {loading && (
          <div className="loading-wrap">
            <div className="spinner" />
            <p>Fetching users…</p>
          </div>
        )}

        {error && (
          <div className="error-wrap">
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button className="btn-retry" onClick={refetch}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <UserTable
            users={filtered}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={handleSort}
            totalCount={users.length}
          />
        )}
      </main>
    </div>
  )
}

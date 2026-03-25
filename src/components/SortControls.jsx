const ICON_ASC = (
  <svg className="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
)

const ICON_DESC = (
  <svg className="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
)

const ICON_UPDOWN = (
  <svg className="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
)

export default function SortControls({ sortKey, sortDir, onSort }) {
  const handleClick = (key) => {
    if (sortKey === key) {
      onSort(key, sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      onSort(key, 'asc')
    }
  }

  const icon = (key) => {
    if (sortKey !== key) return ICON_UPDOWN
    return sortDir === 'asc' ? ICON_ASC : ICON_DESC
  }

  return (
    <div className="sort-group">
      <span className="sort-label">Sort:</span>
      <button
        className={`sort-btn ${sortKey === 'name' ? 'active' : ''}`}
        onClick={() => handleClick('name')}
      >
        {icon('name')} Name
      </button>
      <button
        className={`sort-btn ${sortKey === 'company' ? 'active' : ''}`}
        onClick={() => handleClick('company')}
      >
        {icon('company')} Company
      </button>
    </div>
  )
}

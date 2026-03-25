import { useState, useEffect, useMemo } from 'react'

export function useUsers() {
  const [users, setUsers]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=1000')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setUsers(data)
    } catch (e) {
      setError(e.message || 'Failed to fetch users.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  return { users, loading, error, refetch: fetchUsers }
}

export function useFilteredUsers(users, search, sortKey, sortDir) {
  return useMemo(() => {
    let list = [...users]

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        u =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      )
    }

    // Sorting
    if (sortKey) {
      list.sort((a, b) => {
        const valA = sortKey === 'company' ? a.company.name : a.name
        const valB = sortKey === 'company' ? b.company.name : b.name
        const cmp  = valA.localeCompare(valB)
        return sortDir === 'asc' ? cmp : -cmp
      })
    }

    return list
  }, [users, search, sortKey, sortDir])
}

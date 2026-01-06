import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>🍳 Food Recipe</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/addRecipe">Add Recipe</Link></li>
        <li><Link to="/about">About</Link></li>
        {user ? (
          <>
            <li style={{color: '#666', padding: '0.5rem 1rem', fontSize: '0.9rem'}}>👤 {user.email}</li>
            <li><button onClick={handleLogout} style={{padding: '0.5rem 1.5rem', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500'}}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login"><button style={{padding: '0.5rem 1.5rem', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500'}}>Login</button></Link></li>
        )}
      </ul>
    </nav>
  )
}

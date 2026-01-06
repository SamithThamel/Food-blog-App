import React from 'react'

export default function Footer() {
  return (
    <footer style={{
      background: 'white',
      padding: 'clamp(1rem, 3vw, 2rem)',
      textAlign: 'center',
      marginTop: 'clamp(1.5rem, 4vw, 3rem)',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <p style={{ color: '#6c757d', marginBottom: '0.5rem', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
        © 2025 Food Recipe App. All rights reserved.
      </p>
      <p style={{ color: '#6c757d', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
        Share your favorite recipes with the world 🍴
      </p>
    </footer>
  )
}

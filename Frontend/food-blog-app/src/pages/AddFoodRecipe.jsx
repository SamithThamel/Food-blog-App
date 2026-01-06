import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    time: '',
    coverImage: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to add a recipe')
      navigate('/login')
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to add a recipe')
      navigate('/login')
      return
    }

    const ingredientsArray = formData.ingredients
      .split('\n')
      .filter(item => item.trim() !== '')

    try {
      const response = await axios.post('http://localhost:5000/recipe', {
        ...formData,
        ingredients: ingredientsArray
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        alert('Recipe added successfully!')
        navigate('/')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error adding recipe')
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ 
          marginBottom: '1.5rem', 
          padding: '0.5rem 1rem',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '500'
        }}
      >
        ← Back to Home
      </button>
      
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>Add New Recipe</h1>
      
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="title">Recipe Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (one per line) *</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="2 cups rice&#10;1 onion&#10;2 eggs"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions *</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Cooking Time</label>
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="e.g., 30 minutes"
          />
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Cover Image URL</label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button type="submit" className="btn" style={{width: '100%'}}>Add Recipe</button>
      </form>
    </div>
  )
}

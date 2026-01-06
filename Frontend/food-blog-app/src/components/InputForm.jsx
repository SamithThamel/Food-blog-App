import React, { useState } from 'react'

export default function InputForm({ setIsOpen }) {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    time: '',
    coverImage: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Convert ingredients string to array
    const ingredientsArray = formData.ingredients
      .split('\n')
      .filter(item => item.trim() !== '')

    try {
      const response = await fetch('http://localhost:5000/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          ingredients: ingredientsArray
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        alert('Recipe added successfully!')
        setIsOpen(false)
        window.location.reload()
      } else {
        alert(data.message || 'Failed to add recipe')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error adding recipe')
    }
  }

  return (
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

      <button type="submit" className="btn">Add Recipe</button>
    </form>
  )
}

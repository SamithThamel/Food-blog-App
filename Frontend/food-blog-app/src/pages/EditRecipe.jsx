import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    time: '',
    coverImage: ''
  })
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to edit recipes')
      navigate('/login')
      return
    }
    fetchRecipe()
  }, [id])

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/recipe/${id}`)
      const recipe = response.data
      setFormData({
        title: recipe.title,
        ingredients: recipe.ingredients.join('\n'),
        instructions: recipe.instructions,
        time: recipe.time || '',
        coverImage: recipe.coverImage || ''
      })
      if (recipe.coverImage) {
        setPhotoPreview(`http://localhost:5000${recipe.coverImage}`)
      }
      if (recipe.videoUrl) {
        setVideoPreview(`http://localhost:5000${recipe.videoUrl}`)
      }
    } catch (error) {
      console.error('Error fetching recipe:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setVideoFile(file)
      const url = URL.createObjectURL(file)
      setVideoPreview(url)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const ingredientsArray = formData.ingredients
      .split('\n')
      .filter(item => item.trim() !== '')

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please login to edit recipes')
        navigate('/login')
        return
      }

      // Update recipe details first
      await axios.put(`http://localhost:5000/recipe/${id}`, {
        ...formData,
        ingredients: ingredientsArray
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      let photoUploaded = false
      let videoUploaded = false
      let uploadErrors = []

      // Upload photo if selected
      if (photoFile) {
        try {
          const photoFormData = new FormData()
          photoFormData.append('photo', photoFile)

          await axios.patch(
            `http://localhost:5000/recipe/${id}/photo`, 
            photoFormData, 
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              }
            }
          )
          
          photoUploaded = true
        } catch (photoError) {
          console.error('Photo upload error:', photoError)
          uploadErrors.push('Photo upload failed')
        }
      }

      // Upload video if selected
      if (videoFile) {
        try {
          const videoFormData = new FormData()
          videoFormData.append('video', videoFile)

          await axios.patch(
            `http://localhost:5000/recipe/${id}/video`, 
            videoFormData, 
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              }
            }
          )
          
          videoUploaded = true
        } catch (videoError) {
          console.error('Video upload error:', videoError)
          uploadErrors.push('Video upload failed')
        }
      }

      // Show appropriate message
      if (uploadErrors.length > 0) {
        alert(`Recipe updated but some uploads failed:\n${uploadErrors.join('\n')}`)
      } else if (photoUploaded && videoUploaded) {
        alert('Recipe, photo, and video updated successfully!')
      } else if (photoUploaded) {
        alert('Recipe and photo updated successfully!')
      } else if (videoUploaded) {
        alert('Recipe and video updated successfully!')
      } else {
        alert('Recipe updated successfully!')
      }

      navigate('/')
    } catch (error) {
      console.error('Error:', error)
      alert(error.response?.data?.message || 'Error updating recipe')
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
          fontWeight: '500',
          fontSize: 'clamp(0.85rem, 2vw, 1rem)'
        }}
      >
        ← Back to Home
      </button>
      
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>Edit Recipe</h1>
      
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
          <label htmlFor="photo">Recipe Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ padding: '0.5rem' }}
          />
          {photoPreview && (
            <div style={{ marginTop: '1rem' }}>
              <img 
                src={photoPreview} 
                alt="Preview" 
                style={{ 
                  width: '100%',
                  maxWidth: '300px', 
                  height: 'auto',
                  maxHeight: '200px', 
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }} 
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="video">Recipe Video (Optional)</label>
          <input
            type="file"
            id="video"
            name="video"
            accept="video/*"
            onChange={handleVideoChange}
            style={{ padding: '0.5rem' }}
          />
          <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
            Upload a video showing how to prepare this recipe (Max 50MB)
          </p>
          {videoPreview && (
            <div style={{ marginTop: '1rem' }}>
              <video 
                src={videoPreview} 
                controls
                style={{ 
                  width: '100%',
                  maxHeight: '300px',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }} 
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn" style={{width: '100%'}}>Update Recipe</button>
      </form>
    </div>
  )
}

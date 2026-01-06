import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function RecipeDetails() {
  const recipe = useLoaderData()
  const navigate = useNavigate()

  const deleteRecipe = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await axios.delete(`http://localhost:5000/recipe/${recipe._id}`)
        alert('Recipe deleted successfully!')
        navigate('/')
      } catch (error) {
        console.error('Error deleting recipe:', error)
        alert('Error deleting recipe')
      }
    }
  }

  return (
    <div style={{minHeight: '100vh', background: '#f5f7fa'}}>
      <Navbar />
      
      <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            marginBottom: '1.5rem', 
            padding: '0.5rem 1.5rem', 
            cursor: 'pointer',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#5568d3'
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 6px 12px rgba(102, 126, 234, 0.4)'
          }}
          onMouseOut={(e) => {
            e.target.style.background = '#667eea'
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 4px 6px rgba(102, 126, 234, 0.3)'
          }}
        >
          ← Back to Main Menu
        </button>

        <div style={{ 
          background: 'white', 
          borderRadius: '20px', 
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)' 
        }}>
          {recipe.coverImage && (
            <img 
              src={`http://localhost:5000${recipe.coverImage}`} 
              alt={recipe.title}
              style={{ 
                width: '100%', 
                maxHeight: '400px', 
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}

          {recipe.videoUrl && (
            <div style={{ padding: 'clamp(1rem, 3vw, 2rem)', background: '#000' }}>
              <video 
                src={`http://localhost:5000${recipe.videoUrl}`}
                controls
                style={{
                  width: '100%',
                  maxHeight: '500px',
                  borderRadius: '10px'
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <div style={{ padding: 'clamp(1rem, 3vw, 2rem)' }}>
            <h1 style={{ 
              marginBottom: '1rem', 
              color: '#2d3436',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              wordWrap: 'break-word'
            }}>{recipe.title}</h1>
            
            {recipe.time && (
              <p style={{ 
                color: '#6c757d', 
                marginBottom: '1rem',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)'
              }}>⏱️ Cooking Time: {recipe.time}</p>
            )}

            {recipe.email && (
              <p style={{ 
                color: '#6c757d', 
                marginBottom: '2rem',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                wordWrap: 'break-word'
              }}>👨‍🍳 Created by: {recipe.email}</p>
            )}

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                marginBottom: '1rem', 
                color: '#2d3436',
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)'
              }}>Ingredients</h2>
              <ul style={{ 
                marginLeft: 'clamp(1rem, 3vw, 2rem)', 
                lineHeight: '1.8',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)'
              }}>
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                  <li key={index} style={{ color: '#2d3436', marginBottom: '0.25rem' }}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                marginBottom: '1rem', 
                color: '#2d3436',
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)'
              }}>Instructions</h2>
              <p style={{ 
                lineHeight: '1.8', 
                color: '#2d3436', 
                whiteSpace: 'pre-wrap',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                wordWrap: 'break-word'
              }}>{recipe.instructions}</p>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <button 
                onClick={() => navigate(`/editRecipe/${recipe._id}`)}
                style={{
                  padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 2rem)',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  flex: '1 1 auto',
                  minWidth: '120px'
                }}
              >
                Edit Recipe
              </button>
              <button 
                onClick={deleteRecipe}
                style={{
                  padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 2rem)',
                  background: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  flex: '1 1 auto',
                  minWidth: '120px'
                }}
              >
                Delete Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

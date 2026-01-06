import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import foodRecipe from '../assets/profile-img.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchRecipes()
    }, [])

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/recipe')
            setRecipes(response.data)
        } catch (error) {
            console.error('Error fetching recipes:', error)
        }
    }

    return (
        <div style={{minHeight: '100vh', background: '#f5f7fa'}}>
            <Navbar />
            
            <section className='home'>
                <div className='left'>
                    <h1>Food Recipe</h1>
                    <h5>Discover and share amazing recipes from around the world. Join our community of food lovers and share your culinary creations with everyone!</h5>
                    <button onClick={() => navigate('/addRecipe')}>Share your recipe</button>
                </div>
                <div className='right'>
                    <img src={foodRecipe} width="320px" height="300px" alt="Food Recipe" />
                </div>
            </section>
            
            <div className='bg'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,32L40,32C80,32,160,32,240,58.7C320,85,400,139,480,149.3C560,160,640,128,720,101.3C800,75,880,53,960,80C1040,107,1120,181,1200,213.3C1280,245,1360,235,1400,229.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
            </div>
            
            <div className='recipe' style={{padding: '2rem 1rem'}}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2d3436' }}>Latest Recipes</h2>
                
                {recipes.length === 0 ? (
                    <p style={{textAlign: 'center', color: '#6c757d'}}>No recipes yet. Be the first to share!</p>
                ) : (
                    <div className="recipe-grid" style={{maxWidth: '1200px', margin: '0 auto'}}>
                        {recipes.map((recipe) => (
                            <div key={recipe._id} className="recipe-card" onClick={() => navigate(`/recipe/${recipe._id}`)} style={{cursor: 'pointer', position: 'relative'}}>
                                <div style={{position: 'relative'}}>
                                    <img 
                                        src={recipe.coverImage ? `http://localhost:5000${recipe.coverImage}` : 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=300&fit=crop'} 
                                        alt={recipe.title} 
                                        className="recipe-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=300&fit=crop';
                                        }}
                                    />
                                    {recipe.videoUrl && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            background: 'rgba(0, 0, 0, 0.8)',
                                            color: 'white',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.3rem',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                                        }}>
                                            <span style={{fontSize: '1.1rem'}}>🎥</span>
                                            <span>Video</span>
                                        </div>
                                    )}
                                </div>
                                <div className="recipe-content">
                                    <h3 className="recipe-title">{recipe.title}</h3>
                                    {recipe.time && (
                                        <div className="recipe-meta">
                                            <div className="recipe-time">⏱️ {recipe.time}</div>
                                        </div>
                                    )}
                                    <div className="mb-2">
                                        <strong>Ingredients:</strong> {recipe.ingredients?.length} items
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <Footer />
        </div>
    )
}


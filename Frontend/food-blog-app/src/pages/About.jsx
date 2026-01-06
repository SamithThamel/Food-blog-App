import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Navbar />
      
      {/* Hero Section */}
      <div style={{
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', marginBottom: '1rem', fontWeight: 'bold' }}>
          About Food Recipe Platform
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', maxWidth: '800px', margin: '0 auto', opacity: '0.95' }}>
          Your culinary journey starts here - Share, Discover, and Create amazing recipes
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
        
        {/* Mission Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(1.5rem, 3vw, 3rem)',
          marginBottom: 'clamp(2rem, 5vw, 4rem)'
        }}>
          <div style={{
            background: 'white',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>🍳</div>
            <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', marginBottom: '1rem', color: '#2d3436' }}>Our Mission</h3>
            <p style={{ color: '#636e72', lineHeight: '1.8', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
              To bring food enthusiasts together by creating a platform where anyone can share their favorite recipes and discover new culinary delights from around the world.
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>🌍</div>
            <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', marginBottom: '1rem', color: '#2d3436' }}>Global Community</h3>
            <p style={{ color: '#636e72', lineHeight: '1.8', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
              Join thousands of home cooks and professional chefs sharing their passion for food. From traditional family recipes to innovative fusion dishes.
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>💡</div>
            <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', marginBottom: '1rem', color: '#2d3436' }}>Easy to Use</h3>
            <p style={{ color: '#636e72', lineHeight: '1.8', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
              Our intuitive platform makes it simple to upload recipes with photos, organize ingredients, and share your culinary creations with the world.
            </p>
          </div>
        </div>

        {/* Platform Features */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: 'clamp(1.5rem, 3vw, 3rem)',
          marginBottom: 'clamp(2rem, 5vw, 4rem)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
            marginBottom: '2rem', 
            textAlign: 'center',
            color: '#2d3436',
            fontWeight: 'bold'
          }}>
            What Makes Us Special
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(1rem, 2vw, 2rem)',
            marginTop: '3rem'
          }}>
            <div style={{ padding: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <h4 style={{ color: '#667eea', marginBottom: '0.8rem', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>
                📸 Photo Upload
              </h4>
              <p style={{ color: '#636e72', lineHeight: '1.6', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                Share your dishes with high-quality images that make your recipes stand out
              </p>
            </div>

            <div style={{ padding: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <h4 style={{ color: '#667eea', marginBottom: '0.8rem', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>
                🔒 Secure Authentication
              </h4>
              <p style={{ color: '#636e72', lineHeight: '1.6', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                Your recipes are safe with JWT-based authentication and user management
              </p>
            </div>

            <div style={{ padding: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <h4 style={{ color: '#667eea', marginBottom: '0.8rem', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>
                ✏️ Easy Editing
              </h4>
              <p style={{ color: '#636e72', lineHeight: '1.6', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                Update your recipes anytime with our user-friendly editing interface
              </p>
            </div>

            <div style={{ padding: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <h4 style={{ color: '#667eea', marginBottom: '0.8rem', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>
                ⚡ Fast & Responsive
              </h4>
              <p style={{ color: '#636e72', lineHeight: '1.6', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                Built with modern technology for a smooth and fast user experience
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 'clamp(1rem, 2vw, 2rem)',
          marginBottom: 'clamp(2rem, 5vw, 4rem)',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)'
          }}>
            <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold' }}>1000+</div>
            <div style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', opacity: '0.9' }}>Recipes Shared</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(245, 87, 108, 0.4)'
          }}>
            <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold' }}>500+</div>
            <div style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', opacity: '0.9' }}>Active Users</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(79, 172, 254, 0.4)'
          }}>
            <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold' }}>50+</div>
            <div style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', opacity: '0.9' }}>Categories</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(67, 233, 123, 0.4)'
          }}>
            <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold' }}>24/7</div>
            <div style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', opacity: '0.9' }}>Available</div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
        }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '1.5rem', fontWeight: 'bold' }}>
            Ready to Start Cooking?
          </h2>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', marginBottom: '2rem', opacity: '0.95', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Join our community today and start sharing your favorite recipes with food lovers around the world!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/login')}
              style={{
                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)',
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                background: 'white',
                color: '#667eea',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Get Started
            </button>
            <button 
              onClick={() => navigate('/')}
              style={{
                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)',
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'white'
                e.target.style.color = '#667eea'
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.color = 'white'
              }}
            >
              Browse Recipes
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

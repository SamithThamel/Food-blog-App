import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetails from './pages/RecipeDetails'
import Login from './pages/Login'
import About from './pages/About'
import axios from 'axios'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/addRecipe',
    element: <AddFoodRecipe />
  },
  {
    path: '/editRecipe/:id',
    element: <EditRecipe />
  },
  {
    path: '/recipe/:id',
    element: <RecipeDetails />,
    loader: async ({ params }) => {
      const response = await axios.get(`http://localhost:5000/recipe/${params.id}`)
      return response.data
    }
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/about',
    element: <About />
  }
])

export default function App() {
  return <RouterProvider router={router} />
}

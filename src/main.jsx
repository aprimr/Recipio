import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from "./pages/Home"
import Recipes from "./pages/Recipies"
import SavedRecipes from './pages/SavedRecipies.jsx'
import Policy from './pages/Policy.jsx'
import Terms from './pages/Terms.jsx'
import Details from './pages/Details.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/recipes',
        element: <Recipes />
      },
      {
        path: '/saved',
        element: <SavedRecipes />
      },
      {
        path: '/privacy-policy',
        element: <Policy />
      },
      {
        path: '/terms',
        element: <Terms />
      },
      {
        path: '/details/:id',
        element: <Details />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

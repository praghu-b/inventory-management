import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { RoleProvider } from './context/RoleContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoleProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RoleProvider>
  </StrictMode>,
)

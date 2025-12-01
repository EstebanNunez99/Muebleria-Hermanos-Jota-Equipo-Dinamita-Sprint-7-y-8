import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import { App } from './App'

console.log('🔍 Environment Variables:', import.meta.env);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

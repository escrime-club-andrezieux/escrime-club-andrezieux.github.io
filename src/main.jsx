import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { logoUrl } from './content-assets.js'
import './styles.css'

// Use the club logo (content/logo.*) as the browser tab icon (favicon), so it
// updates automatically when the logo file is replaced.
if (logoUrl) {
  let link = document.querySelector("link[rel~='icon']")
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = logoUrl
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

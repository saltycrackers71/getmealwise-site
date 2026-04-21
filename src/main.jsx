import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './Landing'
import App from './App'
import CookieBanner from './CookieBanner'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<App />} />
        <Route path="/app/*" element={<App />} />
      </Routes>
      <CookieBanner />
    </BrowserRouter>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import SubmittedDetails from './client/SubmittedDetails.tsx'
import ServerSubmittedDetails from './client/ServerSubmittedDetails.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/submitted-details" element={<SubmittedDetails />} />
        <Route path="/server-submitted-details" element={<ServerSubmittedDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

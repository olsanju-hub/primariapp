import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import App from './App'
import Home from './Home'
import Tools from './Tools'
import { toolRoutes } from './toolRoutes'
import './index.css'

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}service-worker.js`, {
        scope: import.meta.env.BASE_URL,
      })
      .catch(() => {})
  })
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='herramientas' element={<Tools />} />
        {toolRoutes.map(({ slug, Component }) => (
          <Route key={slug} path={slug} element={<Component />} />
        ))}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  </HashRouter>
)

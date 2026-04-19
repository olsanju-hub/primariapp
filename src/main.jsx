import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './Home'
import About from './About'
import Tools from './Tools'
import Barthel from './pages/Barthel'
import PHQ9 from './pages/PHQ9'
import GAD7 from './pages/GAD7'
import CHA2DS2VASc from './pages/CHA2DS2VASc'
import HASBLED from './pages/HASBLED'
import QSOFA from './pages/qSOFA'
import SCORE2 from './pages/SCORE2'
import NEWS2 from './pages/NEWS2'
import CRB65 from './pages/CRB65'
import WellsTVP from './pages/WellsTVP'
import CentorMcIsaac from './pages/CentorMcIsaac'
import FINDRISC from './pages/FINDRISC'
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
        <Route path='about' element={<About />} />
        <Route path='barthel' element={<Barthel />} />
        <Route path='phq9' element={<PHQ9 />} />
        <Route path='gad7' element={<GAD7 />} />
        <Route path='cha2ds2vasc' element={<CHA2DS2VASc />} />
        <Route path='hasbled' element={<HASBLED />} />
        <Route path='qsofa' element={<QSOFA />} />
        <Route path='news2' element={<NEWS2 />} />
        <Route path='crb65' element={<CRB65 />} />
        <Route path='wells-tvp' element={<WellsTVP />} />
        <Route path='centor-mcisaac' element={<CentorMcIsaac />} />
        <Route path='findrisc' element={<FINDRISC />} />
        <Route path='score2' element={<SCORE2 />} />
      </Route>
    </Routes>
  </HashRouter>
)

import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './Home'
import About from './About'
import Barthel from './pages/Barthel'
import PHQ9 from './pages/PHQ9'
import GAD7 from './pages/GAD7'
import CHA2DS2VASc from './pages/CHA2DS2VASc'
import HASBLED from './pages/HASBLED'
import QSOFA from './pages/qSOFA'
import SCORE2 from './pages/SCORE2'
import './index.css'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='barthel' element={<Barthel />} />
        <Route path='phq9' element={<PHQ9 />} />
        <Route path='gad7' element={<GAD7 />} />
        <Route path='cha2ds2vasc' element={<CHA2DS2VASc />} />
        <Route path='hasbled' element={<HASBLED />} />
        <Route path='qsofa' element={<QSOFA />} />
        <Route path='score2' element={<SCORE2 />} />
      </Route>
    </Routes>
  </HashRouter>
)

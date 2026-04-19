import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='card hero-card'>
      <img className='hero-logo' src='/logo.png' alt='PrimariAPP Logo' />
      <h1>👋 Bienvenido a PrimariAPP</h1>
      <p className='small hero-copy'>
        PrimariAPP es una herramienta médica diseñada para profesionales de Atención Primaria.
        Incluye escalas, calculadoras y tests clínicos interactivos para facilitar la toma de decisiones en consulta.
      </p>
      <p>🩺 Diseñada por médicos residentes de MFyC.</p>
      <p>📩 Contacto: <a href='mailto:PrimariAPP@gmail.com'>PrimariAPP@gmail.com</a></p>
      <div className='hero-actions'>
        <Link to='/barthel' className='btn btn-primary'>Entrar</Link>
        <Link to='/about' className='btn btn-secondary'>Acerca de</Link>
      </div>
    </div>
  )
}

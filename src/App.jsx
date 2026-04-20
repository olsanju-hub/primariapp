import React, { useEffect } from 'react'
import { BookOpen, ChevronUp, Home, Menu } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, location.search])

  const isHome = location.pathname === '/'
  const isTools = location.pathname === '/herramientas'

  return (
    <div className='app-shell'>
      <header className='app-header'>
        <Link to='/' className='brand-lockup'>
          <div className='brand-copy'>
            <h1>
              Primari<span>APP</span>
            </h1>
            <p>Asistente de valoración clínica</p>
          </div>
        </Link>

        <Link to='/' className='header-home-button' aria-label='Volver al inicio'>
          <Home size={20} />
        </Link>
      </header>

      <main className='app-main'>
        <Outlet />
      </main>

      <nav className='bottom-dock' aria-label='Navegación principal'>
        <Link
          to='/'
          className={isHome ? 'dock-button dock-button--active' : 'dock-button'}
          aria-label='Inicio'
        >
          <Menu size={24} />
        </Link>

        <button
          type='button'
          className='dock-button dock-button--center'
          aria-label='Ir arriba'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp size={24} />
        </button>

        <Link
          to='/herramientas'
          className={isTools ? 'dock-button dock-button--active' : 'dock-button'}
          aria-label='Herramientas'
        >
          <BookOpen size={24} />
        </Link>
      </nav>
    </div>
  )
}

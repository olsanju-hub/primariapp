import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { findRouteMeta, mobileNav } from './appData'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()
  const meta = findRouteMeta(location.pathname)

  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  return (
    <div className='app-shell'>
      <aside className='app-shell-sidebar'>
        <Sidebar />
      </aside>

      <button
        type='button'
        aria-label='Cerrar menú'
        className={drawerOpen ? 'app-drawer-backdrop app-drawer-backdrop--open' : 'app-drawer-backdrop'}
        onClick={() => setDrawerOpen(false)}
      />
      <aside className={drawerOpen ? 'app-drawer app-drawer--open' : 'app-drawer'}>
        <Sidebar onNavigate={() => setDrawerOpen(false)} />
      </aside>

      <div className='app-frame'>
        <header className='topbar'>
          <div className='topbar-leading'>
            <button
              type='button'
              className='icon-button topbar-menu'
              onClick={() => setDrawerOpen((open) => !open)}
              aria-label={drawerOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {drawerOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div>
              <span className='topbar-kicker'>{meta.specialty}</span>
              <div className='topbar-title-row'>
                <h1>{meta.title}</h1>
                <span className='topbar-pill'>Consulta</span>
              </div>
              <p>{meta.description}</p>
            </div>
          </div>

          <div className='topbar-profile'>
            <div className='topbar-profile-copy'>
              <strong>PrimariAPP</strong>
              <span>Entorno clínico de apoyo</span>
            </div>
            <div className='topbar-avatar'>AP</div>
          </div>
        </header>

        <main className='app-workspace'>
          <Outlet />
        </main>

        <nav className='mobile-nav' aria-label='Accesos móviles'>
          {mobileNav.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                isActive ? 'mobile-nav-link mobile-nav-link--active' : 'mobile-nav-link'
              }
            >
              <Icon size={18} />
              <span>{name}</span>
            </NavLink>
          ))}

          <button
            type='button'
            className='mobile-nav-link mobile-nav-link--menu'
            onClick={() => setDrawerOpen(true)}
            aria-label='Más herramientas'
          >
            <Menu size={18} />
            <span>Menú</span>
          </button>
        </nav>
      </div>
    </div>
  )
}

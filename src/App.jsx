import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { mobileNav } from './appData'
import { appIconUrl } from './appIcon'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setDrawerOpen(false)
    window.scrollTo(0, 0)
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
          <button
            type='button'
            className='icon-button topbar-menu'
            onClick={() => setDrawerOpen((open) => !open)}
            aria-label={drawerOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {drawerOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to='/' className='topbar-brand'>
            <img className='topbar-brand-mark' src={appIconUrl} alt='Icono PrimariAPP' />
            <span>PrimariAPP</span>
          </Link>
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

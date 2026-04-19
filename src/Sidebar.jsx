import { NavLink } from 'react-router-dom'
import { activeSpecialties, primaryNav } from './appData'
import { appIconUrl } from './appIcon'

export default function Sidebar({ onNavigate = () => {} }) {
  return (
    <div className='sidebar-panel'>
      <NavLink to='/' className='sidebar-brand' onClick={onNavigate}>
        <img className='sidebar-brand-mark' src={appIconUrl} alt='Icono PrimariAPP' />
        <span>PrimariAPP</span>
      </NavLink>

      <nav className='sidebar-quicklinks' aria-label='Accesos principales'>
        {primaryNav.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              isActive ? 'sidebar-quicklink sidebar-quicklink--active' : 'sidebar-quicklink'
            }
          >
            <Icon size={18} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      <nav className='sidebar-nav' aria-label='Navegación principal'>
        {activeSpecialties.map((specialty) => {
          const Icon = specialty.icon
          return (
            <section key={specialty.id} className='sidebar-section'>
              <div className='sidebar-section-header'>
                <span
                  className='sidebar-icon-wrap'
                  style={{ backgroundColor: specialty.soft, color: specialty.accent }}
                >
                  <Icon size={20} />
                </span>
                <div className='sidebar-section-copy'>
                  <span className='sidebar-section-title'>{specialty.name}</span>
                  <small className='sidebar-section-count'>{specialty.tools.length}</small>
                </div>
              </div>

              <ul className='sidebar-links'>
                {specialty.tools.map((tool) => (
                  <li key={tool.slug}>
                    <NavLink
                      to={tool.path}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        isActive
                          ? 'sidebar-link sidebar-link--active'
                          : 'sidebar-link'
                      }
                    >
                      <span className='sidebar-link-name'>{tool.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </nav>
    </div>
  )
}

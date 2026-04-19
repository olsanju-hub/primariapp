import {
  Activity,
  Baby,
  Brain,
  Heart,
  Info,
  Stethoscope,
  Users,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { primaryNav, specialties } from './appData'
import { appIconUrl } from './appIcon'

const localIcons = {
  Cardiología: Heart,
  Endocrinología: Activity,
  Geriatría: Users,
  Ginecología: Baby,
  Pediatría: Stethoscope,
  Psiquiatría: Brain,
}

export default function Sidebar({ onNavigate = () => {} }) {
  return (
    <div className='sidebar-panel'>
      <div className='sidebar-brand'>
        <NavLink to='/' className='sidebar-brand-link' onClick={onNavigate}>
          <img className='sidebar-brand-mark' src={appIconUrl} alt='Icono PrimariAPP' />
          <div>
            <span className='sidebar-eyebrow'>Herramientas clínicas</span>
            <h1>PrimariAPP</h1>
            <p className='sidebar-copy'>
              Navegación clara para abrir una escala con menos pasos y menos ruido.
            </p>
          </div>
        </NavLink>
      </div>

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
        {specialties.map((specialty) => {
          const Icon = localIcons[specialty.name] ?? specialty.icon
          return (
            <section key={specialty.name} className='sidebar-section'>
              <div className='sidebar-section-header'>
                <span className='sidebar-icon-wrap'>
                  <Icon size={20} />
                </span>
                <div>
                  <span className='sidebar-section-title'>{specialty.name}</span>
                  <p className='sidebar-section-copy'>
                    {specialty.tools.filter(({ path }) => Boolean(path)).length} herramientas activas
                  </p>
                </div>
              </div>

              <ul className='sidebar-links'>
                {specialty.tools.map((tool) => (
                  <li key={tool.name}>
                    {tool.path ? (
                      <NavLink
                        to={tool.path}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                          isActive
                            ? 'sidebar-link sidebar-link--active'
                            : 'sidebar-link'
                        }
                      >
                        <span>{tool.name}</span>
                        <small>{tool.status}</small>
                      </NavLink>
                    ) : (
                      <span className='sidebar-link sidebar-link--muted'>
                        <span>{tool.name}</span>
                        <small>{tool.status}</small>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </nav>

      <div className='sidebar-footer-note'>
        <Info size={16} />
        <p>Las calculadoras complementan la decisión clínica y no sustituyen juicio profesional.</p>
      </div>
    </div>
  )
}

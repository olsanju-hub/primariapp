import {
  Activity,
  Baby,
  Brain,
  Heart,
  Home,
  Info,
  Stethoscope,
  Syringe,
  Thermometer,
  Users,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const categories = [
  {
    name: 'Cardiología',
    icon: Heart,
    scales: [
      { name: 'CHA₂DS₂-VASc', path: '/cha2ds2vasc' },
      { name: 'HAS-BLED', path: '/hasbled' },
      { name: 'SCORE2 (en construcción)', path: '/score2' },
    ],
  },
  {
    name: 'Endocrinología',
    icon: Activity,
    scales: [{ name: 'En construcción (Endocrinología)' }],
  },
  {
    name: 'Geriatría',
    icon: Users,
    scales: [{ name: 'Barthel', path: '/barthel' }],
  },
  {
    name: 'Ginecología',
    icon: Baby,
    scales: [{ name: 'En construcción (Ginecología)' }],
  },
  {
    name: 'Urgencias',
    icon: Syringe,
    scales: [{ name: 'qSOFA', path: '/qsofa' }],
  },
  {
    name: 'Neumología',
    icon: Thermometer,
    scales: [{ name: 'En construcción (Neumología)' }],
  },
  {
    name: 'Pediatría',
    icon: Stethoscope,
    scales: [{ name: 'En construcción (Pediatría)' }],
  },
  {
    name: 'Psiquiatría',
    icon: Brain,
    scales: [
      { name: 'PHQ-9', path: '/phq9' },
      { name: 'GAD-7', path: '/gad7' },
    ],
  },
]

const utilityLinks = [
  { name: 'Inicio', path: '/', icon: Home },
  { name: 'Acerca de', path: '/about', icon: Info },
]

export default function Sidebar() {
  return (
    <div className='sidebar-panel'>
      <div className='sidebar-brand'>
        <NavLink to='/' className='sidebar-brand-link'>
          <span className='sidebar-eyebrow'>Herramientas clinicas</span>
          <h1>PrimariAPP</h1>
          <p className='sidebar-copy'>
            Escalas y calculadoras medicas para consulta de Atencion Primaria.
          </p>
        </NavLink>
      </div>

      <nav className='sidebar-nav' aria-label='Navegacion principal'>
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <section key={cat.name} className='sidebar-section'>
              <div className='sidebar-section-header'>
                <span className='sidebar-icon-wrap'>
                  <Icon size={20} />
                </span>
                <span className='sidebar-section-title'>{cat.name}</span>
              </div>

              <ul className='sidebar-links'>
                {cat.scales.map((scale, idx) => (
                  <li key={idx}>
                    {scale.path ? (
                      <NavLink
                        to={scale.path}
                        className={({ isActive }) =>
                          isActive
                            ? 'sidebar-link sidebar-link--active'
                            : 'sidebar-link'
                        }
                      >
                        {scale.name}
                      </NavLink>
                    ) : (
                      <span className='sidebar-link sidebar-link--muted'>{scale.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </nav>

      <div className='sidebar-utility'>
        {utilityLinks.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              isActive
                ? 'sidebar-utility-link sidebar-utility-link--active'
                : 'sidebar-utility-link'
            }
          >
            <Icon size={18} />
            <span>{name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

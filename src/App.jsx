import React, { useEffect, useMemo, useState } from 'react'
import {
  BookOpen,
  ChevronLeft,
  Home,
  Info,
  Layers3,
  X,
} from 'lucide-react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { activeSpecialties, catalogStats, toolCatalog } from './appData'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [sheet, setSheet] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, location.search])

  useEffect(() => {
    setSheet(null)
  }, [location.pathname, location.search])

  const isHome = location.pathname === '/'
  const isTools = location.pathname === '/herramientas'
  const searchParams = new URLSearchParams(location.search)
  const selectedSpecialtyId = searchParams.get('specialty')

  const currentTool = useMemo(
    () => toolCatalog.find((tool) => tool.path === location.pathname) ?? null,
    [location.pathname]
  )

  const backTarget = useMemo(() => {
    if (isHome) {
      return null
    }

    if (location.pathname === '/herramientas') {
      return selectedSpecialtyId ? '/herramientas' : '/'
    }

    if (currentTool) {
      return `/herramientas?specialty=${currentTool.specialtyId}`
    }

    return '/'
  }, [currentTool, isHome, location.pathname, selectedSpecialtyId])

  const handleBack = () => {
    if (backTarget) {
      navigate(backTarget)
    }
  }

  const toggleSheet = (nextSheet) => {
    setSheet((current) => (current === nextSheet ? null : nextSheet))
  }

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

      {isHome && sheet ? (
        <>
          <button
            type='button'
            className='dock-sheet-backdrop'
            aria-label='Cerrar panel'
            onClick={() => setSheet(null)}
          />

          <section
            className='dock-sheet'
            role='dialog'
            aria-modal='true'
            aria-label={sheet === 'specialties' ? 'Especialidades' : 'Información'}
          >
            <div className='dock-sheet-head'>
              <div>
                <span className='dock-sheet-kicker'>
                  {sheet === 'specialties' ? 'Áreas clínicas' : 'PrimariAPP'}
                </span>
                <h2>{sheet === 'specialties' ? 'Especialidades' : 'Información útil'}</h2>
              </div>

              <button
                type='button'
                className='dock-sheet-close'
                aria-label='Cerrar'
                onClick={() => setSheet(null)}
              >
                <X size={16} />
              </button>
            </div>

            {sheet === 'specialties' ? (
              <div className='dock-sheet-list'>
                {activeSpecialties.map((specialty) => {
                  const Icon = specialty.icon
                  const urgent = specialty.id === 'urgencias'

                  return (
                    <Link
                      key={specialty.id}
                      to={`/herramientas?specialty=${specialty.id}`}
                      className={
                        urgent
                          ? 'dock-sheet-link dock-sheet-link--urgent'
                          : 'dock-sheet-link'
                      }
                    >
                      <span
                        className={
                          urgent
                            ? 'dock-sheet-icon dock-sheet-icon--urgent'
                            : 'dock-sheet-icon'
                        }
                      >
                        <Icon size={16} />
                      </span>

                      <span className='dock-sheet-copy'>
                        <strong>{specialty.name}</strong>
                        <small>{specialty.tools.length} herramientas</small>
                      </span>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className='dock-sheet-info'>
                <section className='dock-sheet-note'>
                  <strong>Uso</strong>
                  <p>Herramienta clínica rápida para consulta, urgencias y planta.</p>
                </section>

                <section className='dock-sheet-note'>
                  <strong>Catálogo</strong>
                  <p>
                    {catalogStats.activeTools} herramientas activas en {catalogStats.activeSpecialties}{' '}
                    áreas clínicas.
                  </p>
                </section>

                <section className='dock-sheet-note'>
                  <strong>Base bibliográfica</strong>
                  <p>Bibliografía del proyecto y referencia principal de Murillo, 7.ª edición.</p>
                </section>

                <section className='dock-sheet-note'>
                  <strong>Alcance</strong>
                  <p>No sustituye juicio clínico, reevaluación ni protocolos locales.</p>
                </section>
              </div>
            )}
          </section>
        </>
      ) : null}

      <nav className='bottom-dock' aria-label='Navegación principal'>
        {isHome ? (
          <>
            <button
              type='button'
              className={sheet === 'specialties' ? 'dock-button dock-button--active' : 'dock-button'}
              aria-label='Especialidades'
              onClick={() => toggleSheet('specialties')}
            >
              <Layers3 size={22} />
              <span>Áreas</span>
            </button>

            <Link
              to='/herramientas'
              className={isTools ? 'dock-button dock-button--center dock-button--active' : 'dock-button dock-button--center'}
              aria-label='Herramientas'
            >
              <BookOpen size={22} />
              <span>Herramientas</span>
            </Link>

            <button
              type='button'
              className={sheet === 'info' ? 'dock-button dock-button--active' : 'dock-button'}
              aria-label='Información'
              onClick={() => toggleSheet('info')}
            >
              <Info size={22} />
              <span>Info</span>
            </button>
          </>
        ) : (
          <>
            <button type='button' className='dock-button' aria-label='Volver' onClick={handleBack}>
              <ChevronLeft size={22} />
              <span>Volver</span>
            </button>

            <Link
              to='/herramientas'
              className={isTools ? 'dock-button dock-button--center dock-button--active' : 'dock-button dock-button--center'}
              aria-label='Herramientas'
            >
              <BookOpen size={22} />
              <span>Herramientas</span>
            </Link>

            <Link to='/' className={isHome ? 'dock-button dock-button--active' : 'dock-button'} aria-label='Inicio'>
              <Home size={22} />
              <span>Inicio</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}

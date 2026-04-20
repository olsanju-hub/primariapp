import React, { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { activeSpecialties, availableTools } from './appData'

export default function Tools() {
  const [searchParams] = useSearchParams()
  const selectedSpecialtyId = searchParams.get('specialty')
  const [query, setQuery] = useState('')

  const selectedSpecialty =
    activeSpecialties.find((specialty) => specialty.id === selectedSpecialtyId) ?? null

  const normalizedQuery = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return availableTools
    }

    return availableTools.filter((tool) => tool.searchText.includes(normalizedQuery))
  }, [normalizedQuery])

  if (selectedSpecialty) {
    const Icon = selectedSpecialty.icon
    const urgent = selectedSpecialty.id === 'urgencias'

    return (
      <section className='page-stage page-stage--narrow'>
        <Link
          to='/'
          className={urgent ? 'page-back-link page-back-link--urgent' : 'page-back-link'}
        >
          <ArrowLeft size={18} />
          Volver al panel
        </Link>

        <div
          className={
            urgent
              ? 'floating-card-no-hover specialty-stage specialty-stage--urgent'
              : 'floating-card-no-hover specialty-stage'
          }
        >
          <div className='specialty-stage-head'>
            <span
              className={
                urgent
                  ? 'specialty-card-icon specialty-card-icon--urgent'
                  : 'specialty-card-icon'
              }
            >
              <Icon size={24} />
            </span>

            <div>
              <h2>Área de {selectedSpecialty.name}</h2>
              <p>{selectedSpecialty.description}</p>
            </div>
          </div>

          <div className='specialty-tool-list'>
            {selectedSpecialty.tools.map((tool) => (
              <Link
                key={tool.slug}
                to={tool.path}
                className={urgent ? 'specialty-tool-link specialty-tool-link--urgent' : 'specialty-tool-link'}
              >
                <span>
                  <strong>{tool.name}</strong>
                  <small>{tool.blurb}</small>
                </span>
                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='page-stage'>
      <div className='home-grid'>
        <section className='floating-card search-stage-card'>
          <h2>
            Explorar todas las <br />
            <span>Herramientas</span>
          </h2>

          <label className='search-field search-field--hero'>
            <Search size={24} />
            <input
              type='search'
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Buscar escala, guía o criterio...'
            />
          </label>
        </section>

        <aside className='info-stage-card'>
          <div>
            <span className='info-stage-label'>Navegación</span>
            <p>Acceso por especialidad o búsqueda directa a la herramienta clínica.</p>
          </div>

          <div className='info-stage-footer'>
            <div className='info-stage-bars' aria-hidden='true'>
              <span />
              <span />
            </div>
            <small>{activeSpecialties.length} áreas clínicas</small>
          </div>
        </aside>

        {normalizedQuery ? (
          results.length > 0 ? (
            results.map((tool) => {
              const Icon = tool.icon

              return (
                <Link key={tool.slug} to={tool.path} className='floating-card specialty-card'>
                  <span
                    className='specialty-card-icon'
                    style={{ backgroundColor: tool.soft, color: tool.accent }}
                  >
                    <Icon size={24} />
                  </span>

                  <div className='specialty-card-copy'>
                    <strong>{tool.name}</strong>
                    <p>{tool.blurb}</p>
                  </div>

                  <span className='specialty-card-inline'>
                    {tool.specialty}
                    <ArrowRight size={16} />
                  </span>
                </Link>
              )
            })
          ) : (
            <div className='floating-card empty-card'>
              <strong>Sin resultados</strong>
              <p>No hay coincidencias para “{query.trim()}”.</p>
            </div>
          )
        ) : (
          activeSpecialties.map((specialty) => {
            const Icon = specialty.icon
            const urgent = specialty.id === 'urgencias'

            return (
              <Link
                key={specialty.id}
                to={`/herramientas?specialty=${specialty.id}`}
                className={
                  urgent
                    ? 'floating-card specialty-card specialty-card--urgent'
                    : 'floating-card specialty-card'
                }
              >
                <span
                  className={
                    urgent
                      ? 'specialty-card-icon specialty-card-icon--urgent'
                      : 'specialty-card-icon'
                  }
                >
                  <Icon size={24} />
                </span>
                <div className='specialty-card-copy'>
                  <strong>{specialty.name}</strong>
                  <p>{specialty.description}</p>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </section>
  )
}

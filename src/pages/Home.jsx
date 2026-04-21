import React, { useDeferredValue, useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { activeSpecialties, availableTools, catalogStats } from '../appData'

export default function Home() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const normalizedQuery = deferredQuery.trim().toLowerCase()

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return []
    }

    return availableTools.filter((tool) => tool.searchText.includes(normalizedQuery))
  }, [normalizedQuery])

  return (
    <section className='page-stage'>
      <div className='home-grid'>
        <section className='floating-card search-stage-card'>
          <h2>
            Explorar por <br />
            <span>Especialidad</span>
          </h2>

          <label className='search-field search-field--hero'>
            <Search size={24} />
            <input
              type='search'
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Buscar escala, guía o síntoma...'
            />
          </label>
        </section>

        <aside className='info-stage-card'>
          <div>
            <span className='info-stage-label'>Soporte</span>
            <p>Protocolos rápidos segmentados por área clínica.</p>
          </div>

          <div className='info-stage-footer'>
            <div className='info-stage-bars' aria-hidden='true'>
              <span />
              <span />
            </div>
            <small>{catalogStats.activeTools} herramientas activas</small>
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
                    {tool.section ? `${tool.specialty} · ${tool.section}` : tool.specialty}
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

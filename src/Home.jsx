import React, { useDeferredValue, useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  activeSpecialties,
  availableTools,
  catalogStats,
  defaultHomeSpecialty,
  featuredTools,
} from './appData'

export default function Home() {
  const [query, setQuery] = useState('')
  const [specialtyId, setSpecialtyId] = useState(defaultHomeSpecialty)
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase()

    if (!normalized) {
      return []
    }

    return availableTools.filter(({ searchText }) => searchText.includes(normalized))
  }, [deferredQuery])

  const activeSpecialty = useMemo(
    () =>
      activeSpecialties.find((specialty) => specialty.id === specialtyId) ?? activeSpecialties[0],
    [specialtyId]
  )
  const ActiveSpecialtyIcon = activeSpecialty.icon
  const specialtyTools = activeSpecialty.tools

  return (
    <div className='home-page'>
      <section className='surface surface--search surface--hero home-hero'>
        <div className='home-hero-head'>
          <div className='home-search-copy'>
            <span className='section-label'>Espacio clínico</span>
            <h2>Buscar herramienta</h2>
            <p className='home-subtle-copy'>
              Acceso directo a escalas operativas para consulta, planta y urgencias.
            </p>
          </div>

          <div className='home-hero-side'>
            <div className='summary-row'>
              <span className='summary-pill'>{catalogStats.activeTools} activas</span>
              <span className='summary-pill summary-pill--muted'>
                {catalogStats.activeSpecialties} áreas
              </span>
            </div>

            <Link to='/herramientas' className='hero-action'>
              Ver catálogo
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <label className='searchbar searchbar--large home-searchbar home-searchbar--hero'>
          <Search size={18} />
          <input
            type='search'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Buscar Barthel, NEWS2, TEP, neumonía...'
          />
        </label>

        {results.length > 0 ? (
          <div className='search-results search-results--featured'>
            {results.slice(0, 6).map((tool) => {
              const ToolIcon = tool.icon

              return (
                <Link key={tool.slug} to={tool.path} className='search-result-card'>
                  <div className='search-result-main'>
                    <span
                      className='floating-icon floating-icon--search'
                      style={{ backgroundColor: tool.soft, color: tool.accent }}
                    >
                      <ToolIcon size={16} />
                    </span>

                    <div>
                      <span className='search-result-tag'>{tool.specialty}</span>
                      <strong className='search-result-name'>{tool.name}</strong>
                    </div>
                  </div>
                  <ArrowRight size={16} />
                </Link>
              )
            })}
          </div>
        ) : deferredQuery.trim() ? (
          <p className='empty-text'>Sin coincidencias.</p>
        ) : null}
      </section>

      <div className='home-main-grid'>
        <section className='surface surface--compact home-specialty-shell'>
          <div className='home-panel-head'>
            <span className='section-label'>Especialidades</span>
            <Link to='/herramientas' className='inline-action'>
              Todas las herramientas
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className='specialty-tabs' role='tablist' aria-label='Especialidades'>
            {activeSpecialties.map((specialty) => {
              const Icon = specialty.icon
              const isActive = specialty.id === activeSpecialty.id

              return (
                <button
                  key={specialty.id}
                  type='button'
                  className={isActive ? 'specialty-tab specialty-tab--active' : 'specialty-tab'}
                  onClick={() => setSpecialtyId(specialty.id)}
                >
                  <span
                    className='specialty-tab-icon'
                    style={{ backgroundColor: specialty.soft, color: specialty.accent }}
                  >
                    <Icon size={16} />
                  </span>
                  <span>{specialty.name}</span>
                  <small>{specialty.tools.length}</small>
                </button>
              )
            })}
          </div>

          <div className='specialty-spotlight'>
            <div className='specialty-spotlight-head'>
              <div
                className='specialty-focus-icon floating-icon floating-icon--large'
                style={{ backgroundColor: activeSpecialty.soft, color: activeSpecialty.accent }}
              >
                <ActiveSpecialtyIcon size={18} />
              </div>

              <div className='specialty-spotlight-copy'>
                <h3>{activeSpecialty.name}</h3>
                <p>{activeSpecialty.tools.length} herramientas operativas</p>
              </div>
            </div>

            <div className='home-specialty-tools'>
              {specialtyTools.map((tool) => {
                const ToolIcon = tool.icon

                return (
                  <Link key={tool.slug} to={tool.path} className='tool-pill tool-pill--detail'>
                    <span
                      className='floating-icon floating-icon--mini'
                      style={{ backgroundColor: tool.soft, color: tool.accent }}
                    >
                      <ToolIcon size={14} />
                    </span>
                    <div className='tool-pill-copy'>
                      <strong>{tool.name}</strong>
                      <span>{tool.blurb}</span>
                    </div>
                    <ArrowRight size={15} />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <aside className='surface surface--compact home-frequent-sheet'>
          <div className='home-panel-head'>
            <span className='section-label'>Frecuentes</span>
            <Link to='/herramientas' className='inline-action'>
              Ver todas
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className='home-frequent-list'>
            {featuredTools.map((tool) => {
              const ToolIcon = tool.icon

              return (
                <Link key={tool.slug} to={tool.path} className='frequent-card'>
                  <div className='frequent-card-main'>
                    <span
                      className='floating-icon'
                      style={{ backgroundColor: tool.soft, color: tool.accent }}
                    >
                      <ToolIcon size={16} />
                    </span>
                    <div>
                      <span className='search-result-tag'>{tool.specialty}</span>
                      <strong>{tool.name}</strong>
                      <p>{tool.blurb}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} />
                </Link>
              )
            })}
          </div>
        </aside>
      </div>
    </div>
  )
}

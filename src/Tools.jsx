import React, { useDeferredValue, useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  TOOL_STATUS,
  availableTools,
  plannedTools,
  specialties,
  toolCatalog,
} from './appData'

export default function Tools() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const normalized = deferredQuery.trim().toLowerCase()

  const filteredSpecialties = useMemo(() => {
    if (!normalized) {
      return specialties
    }

    return specialties
      .map((specialty) => ({
        ...specialty,
        tools: specialty.tools.filter((tool) => tool.searchText.includes(normalized)),
      }))
      .filter((specialty) => specialty.tools.length > 0)
  }, [normalized])

  const resultCount = useMemo(() => {
    if (!normalized) {
      return toolCatalog.length
    }

    return filteredSpecialties.reduce((total, specialty) => total + specialty.tools.length, 0)
  }, [filteredSpecialties, normalized])

  return (
    <div className='tools-page'>
      <section className='surface surface--compact surface--hero tools-hero'>
        <div className='tools-hero-head'>
          <div className='tools-hero-copy'>
            <span className='section-label'>Catálogo clínico</span>
            <h2>Herramientas</h2>
          </div>

          <div className='summary-row'>
            <span className='summary-pill'>{availableTools.length} activas</span>
            {plannedTools.length > 0 ? (
              <span className='summary-pill summary-pill--muted'>
                {plannedTools.length} pendientes
              </span>
            ) : null}
            <span className='tools-count'>
              {normalized ? `${resultCount} resultados` : 'Catálogo completo'}
            </span>
          </div>
        </div>

        <label className='searchbar searchbar--large tools-searchbar'>
          <Search size={18} />
          <input
            type='search'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Buscar por nombre, síntoma o especialidad...'
          />
        </label>
      </section>

      {filteredSpecialties.length > 0 ? (
        <section className='tools-directory'>
          {filteredSpecialties.map((specialty) => {
            const Icon = specialty.icon
            const activeTools = specialty.tools.filter(({ status }) => status === TOOL_STATUS.READY)
            const plannedSpecialtyTools = specialty.tools.filter(
              ({ status }) => status === TOOL_STATUS.PLANNED
            )
            return (
              <section key={specialty.id} className='surface surface--compact tool-group'>
                <div className='tool-group-head'>
                  <div
                    className='specialty-icon floating-icon floating-icon--large'
                    style={{ backgroundColor: specialty.soft, color: specialty.accent }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3>{specialty.name}</h3>
                  </div>
                  <span className='status-pill'>{activeTools.length}</span>
                </div>

                <div className='tool-list'>
                  {activeTools.map((tool) => (
                    <Link key={tool.slug} to={tool.path} className='tool-row'>
                      <div className='tool-row-copy'>
                        <strong>{tool.name}</strong>
                        <span>{tool.blurb}</span>
                      </div>
                      <ArrowRight size={16} />
                    </Link>
                  ))}
                </div>

                {plannedSpecialtyTools.length > 0 ? (
                  <div className='tool-group-secondary'>
                    <span className='tool-group-subhead'>En preparación</span>
                    <div className='tool-list'>
                      {plannedSpecialtyTools.map((tool) =>
                        tool.path ? (
                          <Link key={tool.slug} to={tool.path} className='tool-row tool-row--planned'>
                            <div className='tool-row-copy'>
                              <strong>{tool.name}</strong>
                              <span>{tool.blurb}</span>
                            </div>
                            <small className='status-pill'>{tool.statusLabel}</small>
                          </Link>
                        ) : (
                          <div key={tool.slug} className='tool-row tool-row--planned'>
                            <div className='tool-row-copy'>
                              <strong>{tool.name}</strong>
                              <span>{tool.blurb}</span>
                            </div>
                            <small className='status-pill'>{tool.statusLabel}</small>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : null}
              </section>
            )
          })}
        </section>
      ) : (
        <section className='surface surface--compact'>
          <p className='empty-text'>Sin coincidencias.</p>
        </section>
      )}
    </div>
  )
}

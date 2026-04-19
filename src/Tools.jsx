import React, { useDeferredValue, useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { specialties, toolIndex } from './appData'

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
        tools: specialty.tools.filter((tool) =>
          `${tool.name} ${tool.blurb} ${specialty.name}`.toLowerCase().includes(normalized)
        ),
      }))
      .filter((specialty) => specialty.tools.length > 0)
  }, [normalized])

  const resultCount = useMemo(() => {
    if (!normalized) {
      return toolIndex.length
    }

    return filteredSpecialties.reduce((total, specialty) => total + specialty.tools.length, 0)
  }, [filteredSpecialties, normalized])

  return (
    <div className='tools-page'>
      <section className='surface surface--compact tools-toolbar'>
        <label className='searchbar'>
          <Search size={18} />
          <input
            type='search'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Buscar por nombre o especialidad...'
          />
        </label>
        <span className='tools-count'>{resultCount}</span>
      </section>

      {filteredSpecialties.length > 0 ? (
        <section className='tools-groups'>
          {filteredSpecialties.map((specialty) => {
            const Icon = specialty.icon
            return (
              <section key={specialty.id} className='surface surface--compact tool-group'>
                <div className='tool-group-head'>
                  <div
                    className='specialty-icon'
                    style={{ backgroundColor: specialty.soft, color: specialty.accent }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3>{specialty.name}</h3>
                  </div>
                </div>

                <div className='tool-list'>
                  {specialty.tools.map((tool) =>
                    tool.path ? (
                      <Link key={tool.name} to={tool.path} className='tool-row'>
                        <div className='tool-row-copy'>
                          <strong>{tool.name}</strong>
                          <span>{tool.blurb}</span>
                        </div>
                        <ArrowRight size={16} />
                      </Link>
                    ) : (
                      <div key={tool.name} className='tool-row tool-row--muted'>
                        <div className='tool-row-copy'>
                          <strong>{tool.name}</strong>
                          <span>{tool.blurb}</span>
                        </div>
                        <small className='status-pill'>{tool.status}</small>
                      </div>
                    )
                  )}
                </div>
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

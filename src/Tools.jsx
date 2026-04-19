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
      <section className='surface tools-intro'>
        <div>
          <span className='section-kicker'>Herramientas</span>
          <h2>Un listado simple y clínico para llegar a cualquier escala sin ruido.</h2>
        </div>
        <p className='section-copy'>
          Recorre todas las herramientas disponibles desde un único punto y filtra por
          especialidad, utilidad o nombre.
        </p>
      </section>

      <section className='surface surface--search'>
        <div className='surface-head'>
          <div>
            <span className='surface-kicker'>Filtro</span>
            <h3>Buscar herramienta</h3>
          </div>
          <p>{resultCount} resultados visibles</p>
        </div>

        <label className='searchbar'>
          <Search size={18} />
          <input
            type='search'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Buscar por nombre, especialidad o utilidad...'
          />
        </label>
      </section>

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
                  <p>{specialty.summary}</p>
                </div>
              </div>

              <div className='tool-list'>
                {specialty.tools.map((tool) =>
                  tool.path ? (
                    <Link key={tool.name} to={tool.path} className='tool-row'>
                      <div>
                        <strong>{tool.name}</strong>
                        <span>{tool.blurb}</span>
                      </div>
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <div key={tool.name} className='tool-row tool-row--muted'>
                      <div>
                        <strong>{tool.name}</strong>
                        <span>{tool.blurb}</span>
                      </div>
                      <small>{tool.status}</small>
                    </div>
                  )
                )}
              </div>
            </section>
          )
        })}
      </section>
    </div>
  )
}

import React, { useDeferredValue, useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { activeSpecialties, availableTools, defaultHomeSpecialty } from './appData'

export default function Home() {
  const [query, setQuery] = useState('')
  const [specialtyId, setSpecialtyId] = useState(defaultHomeSpecialty)
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase()

    if (!normalized) {
      return []
    }

    return availableTools.filter(({ name, specialty, blurb }) =>
      `${name} ${specialty} ${blurb}`.toLowerCase().includes(normalized)
    )
  }, [deferredQuery])

  const activeSpecialty = useMemo(
    () =>
      activeSpecialties.find((specialty) => specialty.id === specialtyId) ??
      activeSpecialties[0],
    [specialtyId]
  )

  const specialtyTools = activeSpecialty.tools

  return (
    <div className='home-page'>
      <section className='surface surface--search home-search'>
        <label className='searchbar searchbar--large'>
          <Search size={18} />
          <input
            type='search'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Buscar Barthel, qSOFA, depresión, anticoagulación...'
          />
        </label>

        {results.length > 0 ? (
          <div className='search-results'>
            {results.slice(0, 8).map((tool) => (
              <Link key={tool.name} to={tool.path} className='search-result-card'>
                <div>
                  <span className='search-result-tag'>{tool.specialty}</span>
                  <strong className='search-result-name'>{tool.name}</strong>
                </div>
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        ) : deferredQuery.trim() ? (
          <p className='empty-text'>Sin coincidencias.</p>
        ) : null}
      </section>

      <section className='surface surface--compact home-specialties'>
        <div className='home-specialties-toolbar'>
          <label className='field'>
            <span>Especialidad</span>
            <select
              className='field-select'
              value={activeSpecialty.id}
              onChange={(event) => setSpecialtyId(event.target.value)}
            >
              {activeSpecialties.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </label>

          <Link to='/herramientas' className='inline-action'>
            Todas las herramientas
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className='home-specialty-tools'>
          {specialtyTools.length > 0 ? (
            specialtyTools.map((tool) => (
              <Link key={tool.path} to={tool.path} className='tool-pill'>
                {tool.name}
              </Link>
            ))
          ) : (
            <p className='empty-text'>Sin herramientas activas.</p>
          )}
        </div>
      </section>
    </div>
  )
}

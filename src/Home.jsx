import React, { useDeferredValue, useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { quickAccess, specialties, toolIndex } from './appData'
import { appIconUrl } from './appIcon'

export default function Home() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase()

    if (!normalized) {
      return []
    }

    return toolIndex.filter(({ name, specialty, blurb }) =>
      `${name} ${specialty} ${blurb}`.toLowerCase().includes(normalized)
    )
  }, [deferredQuery])

  return (
    <div className='dashboard'>
      <section className='home-intro'>
        <div>
          <span className='section-kicker'>PrimariAPP</span>
          <h2>Escalas clínicas a mano, con menos ruido y mejor lectura en consulta.</h2>
          <p className='section-copy'>
            Busca, entra y resuelve. La portada queda centrada en acceso rápido, no en
            paneles repetidos.
          </p>
        </div>

        <div className='home-intro-side'>
          <img className='home-intro-mark' src={appIconUrl} alt='Icono PrimariAPP' />
          <Link to='/herramientas' className='btn btn-secondary'>
            Ver todas las herramientas
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className='surface surface--search home-search'>
        <div className='surface-head'>
          <div>
            <span className='surface-kicker'>Buscador principal</span>
            <h3>Encuentra cualquier escala en segundos</h3>
          </div>
          <Link to='/herramientas' className='surface-link'>
            Ver todas
            <ArrowRight size={16} />
          </Link>
        </div>

        <label className='searchbar'>
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
            {results.slice(0, 6).map((tool) => (
              tool.path ? (
                <Link key={tool.name} to={tool.path} className='search-result-card search-result-card--compact'>
                  <div>
                    <span className='search-result-tag'>{tool.specialty}</span>
                    <strong>{tool.name}</strong>
                  </div>
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <div key={tool.name} className='search-result-card search-result-card--muted search-result-card--compact'>
                  <div>
                    <span className='search-result-tag'>{tool.specialty}</span>
                    <strong>{tool.name}</strong>
                  </div>
                </div>
              )
            ))}
          </div>
        ) : null}
      </section>

      <section className='surface surface--compact home-quick'>
        <div className='surface-head'>
          <div>
            <span className='surface-kicker'>Accesos rápidos</span>
            <h3>Lo más usado en consulta</h3>
          </div>
        </div>

        <div className='pill-row'>
          {quickAccess.map((tool) => (
            <Link key={tool.path} to={tool.path} className='tool-pill'>
              {tool.name}
            </Link>
          ))}
        </div>
      </section>

      <section className='dashboard-specialties'>
        <div className='section-headline'>
          <div>
            <span className='section-kicker'>Especialidades</span>
            <h3>Explora por área clínica</h3>
          </div>
          <Link to='/herramientas' className='surface-link'>
            Ver todas las herramientas
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className='specialty-grid'>
          {specialties.map((specialty) => {
            const Icon = specialty.icon
            const activeTools = specialty.tools.filter(({ path }) => Boolean(path))
            const featuredPath = activeTools[0]?.path

            const specialtyCard = (
              <>
                <div
                  className='specialty-icon'
                  style={{ backgroundColor: specialty.soft, color: specialty.accent }}
                >
                  <Icon size={20} />
                </div>
                <div className='specialty-copy'>
                  <strong>{specialty.name}</strong>
                </div>
                <div className='specialty-meta'>
                  <span>{activeTools.length} activas</span>
                  <ArrowRight size={16} />
                </div>
              </>
            )

            return featuredPath ? (
              <Link key={specialty.id} to={featuredPath} className='specialty-card'>
                {specialtyCard}
              </Link>
            ) : (
              <div key={specialty.id} className='specialty-card specialty-card--muted'>
                {specialtyCard}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

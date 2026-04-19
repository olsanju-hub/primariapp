import React, { useDeferredValue, useMemo, useState } from 'react'
import {
  ArrowRight,
  Clock3,
  Search,
  Sparkles,
  Star,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  favoriteTools,
  overviewStats,
  quickAccess,
  recentTools,
  specialties,
  toolIndex,
} from './appData'

const logoUrl = `${import.meta.env.BASE_URL}logo.png`

export default function Home() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase()

    if (!normalized) {
      return favoriteTools
    }

    return toolIndex.filter(({ name, specialty, blurb }) =>
      `${name} ${specialty} ${blurb}`.toLowerCase().includes(normalized)
    )
  }, [deferredQuery])

  return (
    <div className='dashboard'>
      <section className='hero-panel'>
        <div className='hero-copy-block'>
          <span className='section-kicker'>Entorno clínico</span>
          <h2>Consulta escalas útiles en segundos y mantén una lectura clínica clara.</h2>
          <p className='section-copy'>
            PrimariAPP reorganiza acceso, interpretación y conducta orientativa para que
            cada herramienta se use con menos ruido visual y mejor jerarquía.
          </p>

          <div className='hero-actions'>
            <Link to='/cha2ds2vasc' className='btn btn-primary'>
              Abrir acceso rápido
              <ArrowRight size={16} />
            </Link>
            <Link to='/about' className='btn btn-secondary'>Ver marco de uso</Link>
          </div>
        </div>

        <div className='hero-summary'>
          <div className='hero-logo-wrap'>
            <img className='hero-logo' src={logoUrl} alt='PrimariAPP Logo' />
            <div>
              <strong>PrimariAPP</strong>
              <span>Suite clínica para Atención Primaria</span>
            </div>
          </div>

          <div className='hero-stats'>
            {overviewStats.map((item) => (
              <div key={item.label} className='hero-stat-card'>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='dashboard-main'>
        <div className='surface surface--search'>
          <div className='surface-head'>
            <div>
              <span className='surface-kicker'>Buscador</span>
              <h3>Encuentra una escala por nombre, utilidad o especialidad</h3>
            </div>
            <p>Optimizado para consulta rápida y navegación móvil sin perder contexto.</p>
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

          <div className='search-results'>
            {results.map((tool) => (
              tool.path ? (
                <Link key={tool.name} to={tool.path} className='search-result-card'>
                  <div>
                    <span className='search-result-tag'>{tool.specialty}</span>
                    <strong>{tool.name}</strong>
                    <p>{tool.blurb}</p>
                  </div>
                  <span className='search-result-status'>{tool.status}</span>
                </Link>
              ) : (
                <div key={tool.name} className='search-result-card search-result-card--muted'>
                  <div>
                    <span className='search-result-tag'>{tool.specialty}</span>
                    <strong>{tool.name}</strong>
                    <p>{tool.blurb}</p>
                  </div>
                  <span className='search-result-status'>{tool.status}</span>
                </div>
              )
            ))}
          </div>
        </div>

        <div className='dashboard-aside'>
          <section className='surface surface--compact'>
            <div className='surface-inline-title'>
              <Star size={18} />
              <h3>Favoritos</h3>
            </div>
            <div className='mini-list'>
              {favoriteTools.map((tool) => (
                <Link key={tool.path} to={tool.path} className='mini-list-link'>
                  <strong>{tool.name}</strong>
                  <span>{tool.specialty}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className='surface surface--compact'>
            <div className='surface-inline-title'>
              <Clock3 size={18} />
              <h3>Recientes sugeridos</h3>
            </div>
            <div className='mini-list'>
              {recentTools.map((tool) => (
                <Link key={tool.path} to={tool.path} className='mini-list-link'>
                  <strong>{tool.name}</strong>
                  <span>{tool.blurb}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className='dashboard-quick-grid'>
        {quickAccess.map((group) => (
          <div key={group.title} className='surface surface--compact'>
            <div className='surface-inline-title'>
              <Sparkles size={18} />
              <h3>{group.title}</h3>
            </div>
            <p className='surface-text'>{group.description}</p>
            <div className='pill-row'>
              {group.tools.map((tool) => (
                <Link key={tool.path} to={tool.path} className='tool-pill'>
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className='dashboard-specialties'>
        <div className='section-headline'>
          <div>
            <span className='section-kicker'>Especialidades</span>
            <h3>Explora por área clínica</h3>
          </div>
          <p className='section-copy'>
            La navegación se reorganiza por contexto asistencial para reducir pasos innecesarios.
          </p>
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
                  <p>{specialty.summary}</p>
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

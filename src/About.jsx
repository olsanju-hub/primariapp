import React from 'react'
import { aboutHighlights } from './appData'

export default function About() {
  return (
    <article className='about-page'>
      <section className='surface about-intro'>
        <span className='section-kicker'>PrimariAPP</span>
        <h2>Un espacio clínico pensado para consulta breve, seguimiento y lectura rápida.</h2>
        <p className='section-copy'>
          La aplicación reúne escalas y calculadoras en un entorno visual más limpio,
          con jerarquía clínica clara y navegación adaptada a escritorio, tablet y móvil.
        </p>
      </section>

      <section className='about-grid'>
        {aboutHighlights.map((item) => (
          <div key={item.title} className='surface surface--compact'>
            <span className='surface-kicker'>Principio</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      <section className='surface about-detail'>
        <div className='about-columns'>
          <div>
            <span className='surface-kicker'>Uso previsto</span>
            <h3>Diseñada para complementar la valoración, no para reemplazarla.</h3>
            <p>
              Cada módulo sintetiza el formulario, el resultado y la conducta orientativa
              en un único flujo visual. El objetivo es facilitar la interpretación rápida
              y mejorar la legibilidad en consulta.
            </p>
          </div>

          <div>
            <span className='surface-kicker'>Contacto</span>
            <h3>Equipo PrimariAPP</h3>
            <p>
              Proyecto desarrollado con enfoque docente y asistencial para médicos de
              Atención Primaria y entornos afines.
            </p>
            <p>
              <a href='mailto:PrimariAPP@gmail.com'>PrimariAPP@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}

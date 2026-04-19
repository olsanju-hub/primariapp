import React, { useState } from 'react'

export default function Barthel() {
  const items = [
    { key: 'alimentacion', label: 'Alimentación', options: [{t:'Independiente',v:10},{t:'Necesita ayuda',v:5},{t:'Dependiente',v:0}]},
    { key: 'bano', label: 'Baño', options: [{t:'Independiente',v:5},{t:'Dependiente',v:0}]},
    { key: 'aseo', label: 'Aseo personal', options: [{t:'Independiente',v:5},{t:'Dependiente',v:0}]},
    { key: 'vestido', label: 'Vestido', options: [{t:'Independiente',v:10},{t:'Necesita ayuda',v:5},{t:'Dependiente',v:0}]},
    { key: 'deposicion', label: 'Deposición', options: [{t:'Continente',v:10},{t:'Accidental',v:5},{t:'Incontinente',v:0}]},
    { key: 'miccion', label: 'Micción', options: [{t:'Continente',v:10},{t:'Accidental',v:5},{t:'Incontinente',v:0}]},
    { key: 'retrete', label: 'Uso del retrete', options: [{t:'Independiente',v:10},{t:'Necesita ayuda',v:5},{t:'Dependiente',v:0}]},
    { key: 'transferencias', label: 'Transferencias', options: [{t:'Independiente',v:15},{t:'Pequeña ayuda',v:10},{t:'Gran ayuda',v:5},{t:'Dependiente',v:0}]},
    { key: 'deambulacion', label: 'Deambulación', options: [{t:'Independiente',v:15},{t:'Ayuda 1 persona',v:10},{t:'Silla de ruedas',v:5},{t:'Incapaz',v:0}]},
    { key: 'escaleras', label: 'Escaleras', options: [{t:'Independiente',v:10},{t:'Necesita ayuda',v:5},{t:'Incapaz',v:0}]},
  ]
  const [answers, setAnswers] = useState({})
  const total = Object.values(answers).reduce((a,b)=>a+b,0)

  const interpret = () => {
    if (total === 100) return 'Independencia total'
    if (total >= 60) return 'Dependencia leve'
    if (total >= 40) return 'Dependencia moderada'
    if (total >= 20) return 'Dependencia severa'
    return 'Dependencia total'
  }

  return (
    <div>
      <h2>Índice de Barthel</h2>
      <div className='grid'>
        {items.map(it => (
          <div key={it.key} className='card'>
            <strong>{it.label}</strong>
            {it.options.map(opt => (
              <label key={opt.t} className='label'>
                <input type='radio' name={it.key} onChange={()=>setAnswers(a=>({...a,[it.key]:opt.v}))}/>
                <span>{opt.t} <span className='badge'>+{opt.v}</span></span>
              </label>
            ))}
          </div>
        ))}
      </div>
      <div style={{marginTop:16}} className='card'>
        <p><strong>Puntuación:</strong> {total} / 100</p>
        <p><strong>Interpretación:</strong> {interpret()}</p>
      </div>
    </div>
  )
}

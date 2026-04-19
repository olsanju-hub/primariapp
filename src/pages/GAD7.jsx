import React, { useMemo, useState } from 'react'

export default function GAD7() {
  const [scores, setScores] = useState(Array(7).fill(0))
  const total = useMemo(()=>scores.reduce((a,b)=>a+b,0), [scores])
  const labels = ['Nada','Varios días','Más de la mitad de los días','Casi cada día']

  const interpret = () => {
    if (total <= 4) return 'Mínimo'
    if (total <= 9) return 'Leve'
    if (total <= 14) return 'Moderado'
    return 'Grave'
  }

  return (
    <div>
      <h2>GAD-7</h2>
      {scores.map((v, i)=>(
        <div key={i} className='card' style={{marginBottom:8}}>
          <div style={{marginBottom:6}}><strong>Ítem {i+1}</strong></div>
          {labels.map((lab, val)=>(
            <label key={val} className='label'>
              <input type='radio' name={'q'+i} onChange={()=>setScores(s=>{const n=[...s]; n[i]=val; return n})}/>
              <span>{lab} ({val})</span>
            </label>
          ))}
        </div>
      ))}
      <div className='card'>
        <p><strong>Puntuación:</strong> {total} / 21</p>
        <p><strong>Severidad:</strong> {interpret()}</p>
      </div>
    </div>
  )
}

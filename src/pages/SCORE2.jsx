import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ToolPage from '../ToolPage'

export default function SCORE2() {
  return (
    <ToolPage
      specialty='Cardiología'
      title='SCORE2'
      description='Módulo preparado para integrar cálculo de riesgo cardiovascular preventivo en consulta.'
      clinicalUse='Servirá para apoyar prevención primaria y conversación de riesgo compartido.'
      whenToUse='Pendiente de implementación con variables y recomendaciones guiadas.'
      scoreLabel='Estado del módulo'
      scoreValue='En preparación'
      interpretation='La interfaz ya está alineada con el resto del sistema y lista para incorporar el algoritmo.'
      conduct='Mientras se completa, utiliza las herramientas activas de riesgo y documenta factores cardiovasculares en la historia.'
      note='El próximo paso natural es integrar entradas de edad, tabaquismo, perfil tensional y lipídico.'
      tone='neutral'
    >
      <section className='surface surface--compact'>
        <div className='surface-inline-title'>
          <ArrowRight size={18} />
          <h3>Herramientas disponibles mientras tanto</h3>
        </div>
        <div className='pill-row'>
          <Link to='/cha2ds2vasc' className='tool-pill'>CHA₂DS₂-VASc</Link>
          <Link to='/hasbled' className='tool-pill'>HAS-BLED</Link>
        </div>
      </section>
    </ToolPage>
  )
}

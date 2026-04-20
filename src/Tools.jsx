import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { availableTools } from './appData'

export default function Tools() {
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLowerCase()
  const results = normalized ? availableTools.filter(t => t.searchText.includes(normalized)) : availableTools

  return (
    <div className="max-w-6xl mx-auto page-section active space-y-8">
      {/* CABECERA BUSCADOR */}
      <div className="floating-card p-8 md:p-10 rounded-3xl">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Catálogo de Herramientas</h2>
        <p className="text-slate-500 mb-8">Todas las calculadoras, escalas y criterios activos.</p>

        <div className="relative">
          <input type="text" placeholder="Buscar por nombre o especialidad..." value={query} onChange={e => setQuery(e.target.value)}
            className="w-full p-4 pl-12 rounded-2xl bg-[#f4f7f5] border border-transparent focus:bg-white focus:border-slate-200 focus:ring-2 focus:ring-[#557c55] outline-none transition-all" />
          <Search className="absolute left-4 top-4 text-slate-400" size={24} />
        </div>
      </div>

      {/* LISTADO RESULTADOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.length > 0 ? results.map(tool => (
          <Link key={tool.slug} to={tool.path} className="floating-card p-6 rounded-3xl group block border-none">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-[#f4f7f5] text-[#557c55] rounded-full text-xs font-bold uppercase tracking-wider">{tool.specialty}</span>
              <tool.icon size={20} className="text-slate-400 group-hover:text-[#557c55] transition-colors" />
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-1">{tool.name}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{tool.blurb}</p>
          </Link>
        )) : <p className="text-slate-500 p-4">No se encontraron herramientas que coincidan.</p>}
      </div>
    </div>
  )
}

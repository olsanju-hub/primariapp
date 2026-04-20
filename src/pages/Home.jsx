import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { activeSpecialties, availableTools } from '../appData'
import { ArrowRight, Search } from 'lucide-react'

export default function Home() {
  const [activePage, setActivePage] = useState('home')
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const searchResults = normalizedQuery ? availableTools.filter(t => t.searchText.includes(normalizedQuery)) : []

  return (
    <>
      {/* VISTA PRINCIPAL - HOME */}
      {activePage === 'home' && (
        <section className="page-section active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Search Card */}
            <div className="lg:col-span-2 p-10 rounded-3xl floating-card flex flex-col justify-center border-none">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 leading-tight">Explorar por <br /><span className="text-[#557c55]">Especialidad</span></h2>
              <div className="relative">
                <input type="text" placeholder="Buscar escala, guía o síntoma..." value={query} onChange={e => setQuery(e.target.value)}
                  className="w-full p-4 pl-12 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-[#557c55] outline-none transition-all shadow-sm" />
                <Search className="absolute left-4 top-4 text-slate-400" size={24} />
              </div>
            </div>

            {/* Info Card */}
            <div className="p-8 rounded-3xl bg-[#557c55] text-white shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">Soporte</span>
                <p className="mt-2 text-lg font-light">Protocolos rápidos segmentados por área clínica.</p>
              </div>
              <div className="mt-6 flex gap-2">
                <div className="h-1 w-12 bg-white rounded-full"></div>
                <div className="h-1 w-4 bg-white/30 rounded-full"></div>
              </div>
            </div>

            {/* DYNAMIC RESULTS OR SPECIALTY CARDS */}
            {normalizedQuery ? (
               searchResults.length > 0 ? searchResults.map(tool => (
                <Link key={tool.slug} to={tool.path} className="p-6 rounded-3xl floating-card group cursor-pointer border border-slate-200 block">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#557c55] group-hover:text-white transition-all text-slate-500">
                    <tool.icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800">{tool.name}</h3>
                  <p className="text-sm text-slate-500">{tool.blurb}</p>
                </Link>
               )) : <p className="text-slate-500 p-4 col-span-full">Sin resultados para "{query}".</p>
            ) : (
              activeSpecialties.map(spec => (
                <div key={spec.id} onClick={() => { setActivePage(spec.id); window.scrollTo({top:0, behavior:'smooth'}) }} 
                     className={`p-6 rounded-3xl floating-card group cursor-pointer ${spec.id === 'urgencias' ? 'border-red-100 bg-[#fff5f5]/50' : ''}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all ${spec.id === 'urgencias' ? 'bg-red-100 text-[#991b1b] group-hover:bg-[#991b1b] group-hover:text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-[#557c55] group-hover:text-white'}`}>
                    <spec.icon size={24} />
                  </div>
                  <h3 className={`font-bold text-lg ${spec.id === 'urgencias' ? 'text-[#991b1b]' : 'text-slate-800'}`}>{spec.name}</h3>
                  <p className={`text-sm ${spec.id === 'urgencias' ? 'text-red-600/70' : 'text-slate-500'}`}>
                    {spec.tools.slice(0, 3).map(t => t.name).join(', ')}.
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* VISTAS DINÁMICAS POR ESPECIALIDAD */}
      {activeSpecialties.map(spec => (
        activePage === spec.id && (
          <section key={spec.id} className="page-section active">
            <div className="max-w-2xl mx-auto py-10">
              <button onClick={() => setActivePage('home')} className={`flex items-center gap-2 mb-6 font-semibold hover:underline ${spec.id === 'urgencias' ? 'text-[#991b1b]' : 'text-[#557c55]'}`}>
                <ArrowRight className="rotate-180" size={20} /> Volver al panel
              </button>
              <div className={`floating-card p-10 rounded-3xl ${spec.id === 'urgencias' ? 'border-red-50 bg-[#fff5f5]' : ''}`}>
                <h2 className={`text-2xl font-bold mb-4 ${spec.id === 'urgencias' ? 'text-[#991b1b]' : 'text-slate-800'}`}>Área de {spec.name}</h2>
                <p className="text-slate-500 mb-6">Selecciona el protocolo o escala requerida para valoración.</p>
                
                <div className="grid grid-cols-1 gap-4">
                  {spec.tools.map(tool => (
                    <Link key={tool.slug} to={tool.path} className={`p-4 bg-white rounded-xl shadow-sm transition-colors text-slate-700 block font-medium ${spec.id === 'urgencias' ? 'border border-red-100 hover:bg-red-50' : 'border border-slate-200 hover:bg-slate-50'}`}>
                      {tool.name} <span className="text-xs text-slate-400 font-normal ml-2 hidden sm:inline">{tool.blurb}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      ))}
    </>
  )
}
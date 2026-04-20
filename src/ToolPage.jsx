import React from 'react'
import { AlertTriangle, ClipboardList, Stethoscope, ShieldCheck } from 'lucide-react'

export default function ToolPage({
  specialty, status, title, description, clinicalUse, whenToUse,
  scoreLabel, scoreValue, interpretation, conduct, note, tone = 'neutral', children
}) {
  const toneColors = {
    neutral: 'bg-slate-700',
    positive: 'bg-[#557c55]',
    warning: 'bg-amber-600',
    critical: 'bg-[#991b1b]'
  }

  return (
    <article className="max-w-5xl mx-auto space-y-6 page-section active">
      {/* HEADER FLOTANTE */}
      <header className="floating-card-no-hover p-8 md:p-10 rounded-3xl">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-[#f4f7f5] text-[#557c55] rounded-full text-xs font-bold uppercase tracking-wider">{specialty}</span>
          {status && <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold uppercase tracking-wider">{status}</span>}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">{title}</h2>
        <p className="text-slate-600 max-w-3xl mb-8 leading-relaxed">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#f4f7f5]/50 p-4 rounded-2xl border border-white/60">
            <div className="flex items-center gap-2 text-[#557c55] font-semibold text-sm uppercase tracking-wider mb-2"><ClipboardList size={16} /> Utilidad</div>
            <p className="text-slate-700 text-sm">{clinicalUse}</p>
          </div>
          <div className="bg-[#f4f7f5]/50 p-4 rounded-2xl border border-white/60">
            <div className="flex items-center gap-2 text-[#557c55] font-semibold text-sm uppercase tracking-wider mb-2"><Stethoscope size={16} /> Uso</div>
            <p className="text-slate-700 text-sm">{whenToUse}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ÁREA DE FORMULARIO */}
        <section className="lg:col-span-2 floating-card-no-hover p-6 md:p-8 rounded-3xl">
          {children}
        </section>

        {/* ÁREA DE RESULTADOS */}
        <aside className="space-y-6">
          <div className={`${toneColors[tone] || toneColors.neutral} p-8 rounded-3xl text-white shadow-xl`}>
            <span className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-2">{scoreLabel}</span>
            <strong className="block text-4xl md:text-5xl font-bold mb-4">{scoreValue}</strong>
            <p className="text-white/95 leading-relaxed font-medium">{interpretation}</p>
          </div>
          <div className="floating-card-no-hover p-6 rounded-3xl">
            <div className="flex items-center gap-2 text-[#557c55] font-bold mb-3"><ShieldCheck size={20} /> Conducta</div>
            <p className="text-slate-700 text-sm leading-relaxed">{conduct}</p>
          </div>
          {note ? (
            <div className="bg-[#fff5f5] border border-red-100 p-6 rounded-3xl">
              <div className="flex items-center gap-2 text-[#991b1b] font-bold mb-3"><AlertTriangle size={20} /> Nota</div>
              <p className="text-red-900/80 text-sm leading-relaxed">{note}</p>
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  )
}

import {
  Brain,
  Heart,
  Home,
  LayoutGrid,
  ShieldAlert,
  Stethoscope,
  Thermometer,
  Users,
} from 'lucide-react'

export const TOOL_STATUS = {
  READY: 'ready',
  PLANNED: 'planned',
}

export const TOOL_STATUS_LABELS = {
  [TOOL_STATUS.READY]: 'Operativa',
  [TOOL_STATUS.PLANNED]: 'En preparación',
}

const specialtyMeta = [
  {
    id: 'urgencias',
    name: 'Urgencias',
    icon: ShieldAlert,
    accent: '#991b1b',
    soft: '#fff5f5',
    description: 'Triage, deterioro agudo y reglas de soporte inicial.',
  },
  {
    id: 'atencion-primaria',
    name: 'Atención Primaria',
    icon: Stethoscope,
    accent: '#557c55',
    soft: '#f4f7f5',
    description: 'Cribado y decisión rápida en consulta diaria.',
  },
  {
    id: 'cardiologia',
    name: 'Cardiología',
    icon: Heart,
    accent: '#557c55',
    soft: '#f4f7f5',
    description: 'FA, anticoagulación y valoración de riesgo vascular.',
  },
  {
    id: 'geriatria',
    name: 'Geriatría',
    icon: Users,
    accent: '#557c55',
    soft: '#f4f7f5',
    description: 'Funcionalidad, dependencia y situación basal.',
  },
  {
    id: 'neumologia',
    name: 'Neumología',
    icon: Thermometer,
    accent: '#557c55',
    soft: '#f4f7f5',
    description: 'Disnea, neumonía y reglas respiratorias útiles.',
  },
  {
    id: 'salud-mental',
    name: 'Salud Mental',
    icon: Brain,
    accent: '#557c55',
    soft: '#f4f7f5',
    description: 'Cribado breve de depresión y ansiedad.',
  },
]

const specialtyMap = new Map(specialtyMeta.map((specialty) => [specialty.id, specialty]))

const rawToolCatalog = [
  {
    slug: 'qsofa',
    name: 'qSOFA',
    specialtyId: 'urgencias',
    blurb: 'Cribado rápido de sepsis.',
    status: TOOL_STATUS.READY,
    featured: true,
    searchTerms: ['sepsis', 'infección', 'deterioro', 'urgencias'],
  },
  {
    slug: 'news2',
    name: 'NEWS2',
    specialtyId: 'urgencias',
    blurb: 'Detección de deterioro agudo.',
    status: TOOL_STATUS.READY,
    featured: true,
    searchTerms: ['deterioro', 'alerta temprana', 'monitorización', 'gravedad', 'triaje'],
  },
  {
    slug: 'wells-tep',
    name: 'Wells TEP',
    specialtyId: 'urgencias',
    blurb: 'Probabilidad clínica de TEP.',
    status: TOOL_STATUS.READY,
    featured: true,
    searchTerms: ['tep', 'tromboembolismo pulmonar', 'disnea', 'dímero-d', 'angio-tc'],
  },
  {
    slug: 'years',
    name: 'YEARS',
    specialtyId: 'urgencias',
    blurb: 'Algoritmo TEP con dímero-D.',
    status: TOOL_STATUS.READY,
    searchTerms: ['tep', 'dímero-d', 'algoritmo', 'disnea', 'embolismo pulmonar'],
  },
  {
    slug: 'ginebra-simplificada',
    name: 'Ginebra simplificada',
    specialtyId: 'urgencias',
    blurb: 'Probabilidad objetiva de TEP.',
    status: TOOL_STATUS.READY,
    searchTerms: ['tep', 'geneva', 'ginebra', 'embolismo pulmonar', 'probabilidad'],
  },
  {
    slug: 'wells-tvp',
    name: 'Wells TVP',
    specialtyId: 'urgencias',
    blurb: 'Probabilidad clínica de TVP.',
    status: TOOL_STATUS.READY,
    featured: true,
    searchTerms: ['trombosis', 'tvp', 'edema', 'pierna', 'dímero-d', 'ecografía venosa'],
  },
  {
    slug: 'perc',
    name: 'PERC',
    specialtyId: 'urgencias',
    blurb: 'Descarte clínico rápido de TEP.',
    status: TOOL_STATUS.READY,
    featured: true,
    searchTerms: ['tep', 'tromboembolia', 'embolismo pulmonar', 'dímero-d', 'disnea'],
  },
  {
    slug: 'centor-mcisaac',
    name: 'Centor/McIsaac',
    specialtyId: 'atencion-primaria',
    blurb: 'Faringoamigdalitis aguda.',
    status: TOOL_STATUS.READY,
    featured: true,
    searchTerms: ['amigdalitis', 'odinofagia', 'estreptococo'],
  },
  {
    slug: 'findrisc',
    name: 'FINDRISC',
    specialtyId: 'atencion-primaria',
    blurb: 'Riesgo de diabetes tipo 2.',
    status: TOOL_STATUS.READY,
    searchTerms: ['diabetes', 'metabólico', 'cribado', 'glucemia'],
  },
  {
    slug: 'cha2ds2vasc',
    name: 'CHA₂DS₂-VASc',
    specialtyId: 'cardiologia',
    blurb: 'Riesgo tromboembólico en FA.',
    status: TOOL_STATUS.READY,
    featured: true,
    searchTerms: ['fibrilación auricular', 'anticoagulación', 'ictus'],
  },
  {
    slug: 'hasbled',
    name: 'HAS-BLED',
    specialtyId: 'cardiologia',
    blurb: 'Riesgo hemorrágico.',
    status: TOOL_STATUS.READY,
    searchTerms: ['sangrado', 'hemorragia', 'anticoagulación'],
  },
  {
    slug: 'score2',
    name: 'SCORE2',
    specialtyId: 'cardiologia',
    blurb: 'Riesgo cardiovascular preventivo.',
    status: TOOL_STATUS.PLANNED,
    searchTerms: ['prevención', 'lípidos', 'colesterol', 'cardiovascular'],
  },
  {
    slug: 'barthel',
    name: 'Índice de Barthel',
    specialtyId: 'geriatria',
    blurb: 'Dependencia en ABVD.',
    status: TOOL_STATUS.READY,
    searchTerms: ['funcionalidad', 'dependencia', 'geriatría', 'abvd'],
  },
  {
    slug: 'crb65',
    name: 'CRB-65',
    specialtyId: 'neumologia',
    blurb: 'Gravedad rápida de NAC sin analítica.',
    status: TOOL_STATUS.READY,
    featured: true,
    searchTerms: ['neumonía', 'pac', 'gravedad', 'nac', 'domicilio'],
  },
  {
    slug: 'curb65',
    name: 'CURB-65',
    specialtyId: 'neumologia',
    blurb: 'Gravedad de NAC con urea.',
    status: TOOL_STATUS.READY,
    searchTerms: ['neumonía', 'pac', 'gravedad', 'nac', 'urea', 'ingreso'],
  },
  {
    slug: 'phq9',
    name: 'PHQ-9',
    specialtyId: 'salud-mental',
    blurb: 'Síntomas depresivos.',
    status: TOOL_STATUS.READY,
    searchTerms: ['depresión', 'ánimo', 'cribado'],
  },
  {
    slug: 'gad7',
    name: 'GAD-7',
    specialtyId: 'salud-mental',
    blurb: 'Ansiedad generalizada.',
    status: TOOL_STATUS.READY,
    searchTerms: ['ansiedad', 'preocupación', 'salud mental'],
  },
]

export const toolCatalog = rawToolCatalog.map((tool) => {
  const specialty = specialtyMap.get(tool.specialtyId)

  return {
    ...tool,
    path: `/${tool.slug}`,
    specialty: specialty.name,
    icon: specialty.icon,
    accent: specialty.accent,
    soft: specialty.soft,
    statusLabel: TOOL_STATUS_LABELS[tool.status],
    searchText: [
      tool.name,
      tool.blurb,
      specialty.name,
      ...(tool.searchTerms ?? []),
    ]
      .join(' ')
      .toLowerCase(),
  }
})

export const specialties = specialtyMeta.map((specialty) => ({
  ...specialty,
  tools: toolCatalog.filter((tool) => tool.specialtyId === specialty.id),
}))

export const availableTools = toolCatalog.filter(({ status }) => status === TOOL_STATUS.READY)
export const plannedTools = toolCatalog.filter(({ status }) => status === TOOL_STATUS.PLANNED)

export const activeSpecialties = specialties
  .map((specialty) => ({
    ...specialty,
    tools: specialty.tools.filter(({ status }) => status === TOOL_STATUS.READY),
  }))
  .filter((specialty) => specialty.tools.length > 0)

export const defaultHomeSpecialty = activeSpecialties[0]?.id ?? specialtyMeta[0].id

export const featuredTools = availableTools.filter(({ featured }) => Boolean(featured))

export const catalogStats = {
  totalTools: toolCatalog.length,
  activeTools: availableTools.length,
  plannedTools: plannedTools.length,
  activeSpecialties: activeSpecialties.length,
}

export const primaryNav = [
  { name: 'Inicio', path: '/', icon: Home },
  { name: 'Herramientas', path: '/herramientas', icon: LayoutGrid },
]

export const mobileNav = [
  { name: 'Inicio', path: '/', icon: Home },
  { name: 'Lista', path: '/herramientas', icon: LayoutGrid },
  { name: 'Wells TEP', path: '/wells-tep', icon: ShieldAlert },
  { name: 'NEWS2', path: '/news2', icon: Heart },
]

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
    accent: '#ef7f4e',
    soft: '#fff1e8',
  },
  {
    id: 'atencion-primaria',
    name: 'Atención Primaria',
    icon: Stethoscope,
    accent: '#3487b5',
    soft: '#eaf7fb',
  },
  {
    id: 'cardiologia',
    name: 'Cardiología',
    icon: Heart,
    accent: '#2f72de',
    soft: '#e8f1ff',
  },
  {
    id: 'geriatria',
    name: 'Geriatría',
    icon: Users,
    accent: '#7e6ad9',
    soft: '#f0ecff',
  },
  {
    id: 'neumologia',
    name: 'Neumología',
    icon: Thermometer,
    accent: '#4597a9',
    soft: '#e8f8fb',
  },
  {
    id: 'salud-mental',
    name: 'Salud Mental',
    icon: Brain,
    accent: '#5b70d6',
    soft: '#eef1ff',
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
    searchTerms: ['deterioro', 'alerta temprana', 'monitorización'],
  },
  {
    slug: 'wells-tvp',
    name: 'Wells TVP',
    specialtyId: 'urgencias',
    blurb: 'Probabilidad clínica de TVP.',
    status: TOOL_STATUS.READY,
    searchTerms: ['trombosis', 'edema', 'pierna', 'dímero-d'],
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
    blurb: 'Neumonía adquirida en la comunidad.',
    status: TOOL_STATUS.READY,
    searchTerms: ['neumonía', 'pac', 'gravedad'],
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
  { name: 'qSOFA', path: '/qsofa', icon: ShieldAlert },
  { name: 'NEWS2', path: '/news2', icon: Heart },
]

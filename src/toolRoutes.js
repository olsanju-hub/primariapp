import Barthel from './pages/Barthel'
import CHA2DS2VASc from './pages/CHA2DS2VASc'
import CRB65 from './pages/CRB65'
import CURB65 from './pages/CURB65'
import CentorMcIsaac from './pages/CentorMcIsaac'
import FINDRISC from './pages/FINDRISC'
import GAD7 from './pages/GAD7'
import HASBLED from './pages/HASBLED'
import NEWS2 from './pages/NEWS2'
import PERC from './pages/PERC'
import PHQ9 from './pages/PHQ9'
import SCORE2 from './pages/SCORE2'
import WellsTVP from './pages/WellsTVP'
import QSOFA from './pages/qSOFA'

export const toolRoutes = [
  { slug: 'barthel', Component: Barthel },
  { slug: 'phq9', Component: PHQ9 },
  { slug: 'gad7', Component: GAD7 },
  { slug: 'cha2ds2vasc', Component: CHA2DS2VASc },
  { slug: 'hasbled', Component: HASBLED },
  { slug: 'qsofa', Component: QSOFA },
  { slug: 'news2', Component: NEWS2 },
  { slug: 'crb65', Component: CRB65 },
  { slug: 'curb65', Component: CURB65 },
  { slug: 'perc', Component: PERC },
  { slug: 'wells-tvp', Component: WellsTVP },
  { slug: 'centor-mcisaac', Component: CentorMcIsaac },
  { slug: 'findrisc', Component: FINDRISC },
  { slug: 'score2', Component: SCORE2 },
]

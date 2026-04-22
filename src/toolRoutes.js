import Alvarado from './pages/Alvarado'
import Barthel from './pages/Barthel'
import CAT from './pages/CAT'
import CHA2DS2VASc from './pages/CHA2DS2VASc'
import ChildPugh from './pages/ChildPugh'
import CRB65 from './pages/CRB65'
import CURB65 from './pages/CURB65'
import CentorMcIsaac from './pages/CentorMcIsaac'
import FINDRISC from './pages/FINDRISC'
import GAD7 from './pages/GAD7'
import GlasgowBlatchford from './pages/GlasgowBlatchford'
import HASBLED from './pages/HASBLED'
import NEWS2 from './pages/NEWS2'
import PERC from './pages/PERC'
import PHQ9 from './pages/PHQ9'
import Pfeiffer from './pages/Pfeiffer'
import MMRC from './pages/MMRC'
import RockallPreendoscopico from './pages/RockallPreendoscopico'
import SCORE2 from './pages/SCORE2'
import SCORE2OP from './pages/SCORE2OP'
import SimplifiedGeneva from './pages/SimplifiedGeneva'
import STOPBang from './pages/STOPBang'
import WellsTVP from './pages/WellsTVP'
import WellsTEP from './pages/WellsTEP'
import YEARS from './pages/YEARS'
import QSOFA from './pages/qSOFA'
import FRAIL from './pages/FRAIL'
import LawtonBrody from './pages/LawtonBrody'

export const toolRoutes = [
  { slug: 'alvarado', Component: Alvarado },
  { slug: 'barthel', Component: Barthel },
  { slug: 'child-pugh', Component: ChildPugh },
  { slug: 'mmrc', Component: MMRC },
  { slug: 'cat', Component: CAT },
  { slug: 'glasgow-blatchford', Component: GlasgowBlatchford },
  { slug: 'rockall-preendoscopico', Component: RockallPreendoscopico },
  { slug: 'stop-bang', Component: STOPBang },
  { slug: 'lawton-brody', Component: LawtonBrody },
  { slug: 'pfeiffer', Component: Pfeiffer },
  { slug: 'frail', Component: FRAIL },
  { slug: 'phq9', Component: PHQ9 },
  { slug: 'gad7', Component: GAD7 },
  { slug: 'cha2ds2vasc', Component: CHA2DS2VASc },
  { slug: 'hasbled', Component: HASBLED },
  { slug: 'qsofa', Component: QSOFA },
  { slug: 'news2', Component: NEWS2 },
  { slug: 'crb65', Component: CRB65 },
  { slug: 'curb65', Component: CURB65 },
  { slug: 'perc', Component: PERC },
  { slug: 'wells-tep', Component: WellsTEP },
  { slug: 'wells-tvp', Component: WellsTVP },
  { slug: 'ginebra-simplificada', Component: SimplifiedGeneva },
  { slug: 'years', Component: YEARS },
  { slug: 'centor-mcisaac', Component: CentorMcIsaac },
  { slug: 'findrisc', Component: FINDRISC },
  { slug: 'score2', Component: SCORE2 },
  { slug: 'score2-op', Component: SCORE2OP },
]

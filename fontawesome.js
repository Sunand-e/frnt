import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faFilePdf,
  faFileWord,
  faList,
  faEye,
  faChalkboardTeacher,
  faPlug,
  faPallet,
  faRocket,
  faUserPlus,
  faQuestion,
  faCity,
  faAngleRight,
  faGlobe,
  faLink,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'

export const addIconsToLibrary = () => {
  library.add(
    faFilePdf,
    faFileWord,
    faList,
    faEye,
    faChalkboardTeacher,
    faPlug,
    faPallet,
    faRocket,
    faUserPlus,
    faQuestion,
    faCity,
    faAngleRight,
    faGlobe,
    faLink,
    faPencilAlt
    )
}


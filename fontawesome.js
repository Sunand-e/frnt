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
  faSchool,
  faUserPlus,
  faQuestion,
  faCity,
  faAngleRight,
  faGlobe,
  faLink,
  faPencilAlt,
  faChevronRight,
  faCog,
  faHome,
  faUsers,
  faCalendarAlt,
  faStore,
  faComments,
  faGraduationCap,
  faPhotoVideo,
  faChartLine
} from '@fortawesome/free-solid-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons/faHouseChimney'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays'

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
    faPencilAlt,
    faChevronRight,
    faCog,
    faSchool,
    faHome,
    faUsers,
    faCalendarAlt,
    faCalendarDays,
    faStore,
    faComments,
    faGraduationCap,
    faPhotoVideo,
    faChartLine,
    faHouseChimney
  )
}
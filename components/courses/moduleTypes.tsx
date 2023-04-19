import {TextLeft} from '@styled-icons/bootstrap/TextLeft'
import {Quiz} from '@styled-icons/material-rounded/Quiz'
import {Box} from '@styled-icons/fluentui-system-filled/Box'
import {StyledIcon} from '@styled-icons/styled-icon'
interface ModuleTypes {
  [key: string]: {
    label?: string
    shortName?: string
    icon?: StyledIcon
    sidebarPanels?: string[]
    defaultContent?: JSON
  }
}

export const moduleTypes: ModuleTypes = {
  standard_lesson: {
    label: "Lesson", 
    shortName: "Lesson", 
    icon: TextLeft,
    sidebarPanels: ['structure', 'blocks']
  },
  scorm_assessment: {
    label: "SCORM Module",
    icon: Box,
    sidebarPanels: ['structure']
  },
  quiz: {
    label: "Quiz",
    icon: Quiz,
    sidebarPanels: ['structure', 'questions']
  },
}
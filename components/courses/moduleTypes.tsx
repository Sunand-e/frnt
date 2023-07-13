import {TextLeft} from '@styled-icons/bootstrap/TextLeft'
import {Quiz} from '@styled-icons/material-rounded/Quiz'
import {Box} from '@styled-icons/fluentui-system-filled/Box'
import {StyledIcon} from '@styled-icons/styled-icon'
interface ModuleTypes {
  [key: string]: {
    label?: string
    shortName?: string
    lowercase?: string
    icon?: StyledIcon
    sidebarPanels?: string[]
    defaultContent?: JSON
  }
}

export const moduleTypes: ModuleTypes = {
  standard_lesson: {
    label: "Lesson", 
    lowercase: "lesson", 
    shortName: "Lesson", 
    icon: TextLeft,
    sidebarPanels: ['blocks']
  },
  scorm_assessment: {
    label: "SCORM Module",
    lowercase: "SCORM module", 
    icon: Box,
  },
  quiz: {
    label: "Quiz",
    lowercase: "quiz",
    icon: Quiz,
    sidebarPanels: ['questions']
  },
}
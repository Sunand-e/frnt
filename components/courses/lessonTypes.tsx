import {TextLeft} from '@styled-icons/bootstrap/TextLeft'
import {Bricks} from '@styled-icons/bootstrap/Bricks'
import {Assignment} from '@styled-icons/material/Assignment'
import {Quiz} from '@styled-icons/material-rounded/Quiz'
import {Box} from '@styled-icons/fluentui-system-filled/Box'
import {Video} from '@styled-icons/fluentui-system-filled/Video'
import {List} from '@styled-icons/fluentui-system-filled/List'
import {Image} from '@styled-icons/fluentui-system-filled/Image'
import {Document} from '@styled-icons/fluentui-system-filled/Document'
import {Speaker2} from '@styled-icons/fluentui-system-filled/Speaker2'
import { v4 as uuidv4 } from 'uuid'
import { ReactNode } from 'react'
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

export const lessonTypes: ModuleTypes = {
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
    sidebarPanels: ['structure', 'blocks']
  },
// export const lessonTypes = {
//   text: {
//     label: "Text", 
//     icon: TextLeft,
//     defaultContent: { blocks: [{id: uuidv4(), type:'text'}]}
//   },
//   video: {
//     label: "Video",
//     icon: Video,
//     defaultContent: { blocks: [{
//         id: uuidv4(), type:'video',
//         properties: {
//           url: ''
//         }
//       }]}
//   },
//   image: {
//     label: "Image",
//     icon: Image,
//     defaultContent: { blocks: [{id: uuidv4(), type:'image'}]}
//   },
//   document: {
//     label: "Document",
//     icon: Document,
//     defaultContent:
//       { blocks: [{id: uuidv4(), type:'document'}]}
//   },
//   audio: {
//     label: "Audio",
//     icon: Speaker2,
//     defaultContent:
//       { blocks: [{id: uuidv4(), type:'audio'}]}
//   },
//   scorm: {
//     label: "SCORM",
//     icon: Box,
//     defaultContent:
//       { blocks: [{
//         id: uuidv4(), type:'package',
//         properties: {
//           url: ''
//         }
//       }]}
//   },
//   freeform: {
//     label: "Freeform",
//     icon: Bricks,
//     defaultContent:
//       { blocks: []}
//   },
}
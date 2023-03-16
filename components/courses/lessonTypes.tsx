import {TextLeft, Bricks} from '@styled-icons/bootstrap'
import {Assignment} from '@styled-icons/material'
import {Quiz} from '@styled-icons/material-rounded/Quiz'
import {Box} from '@styled-icons/fluentui-system-filled/Box'
import {Video} from '@styled-icons/fluentui-system-filled/Video'
import {List} from '@styled-icons/fluentui-system-filled/List'
import {Image} from '@styled-icons/fluentui-system-filled/Image'
import {Document} from '@styled-icons/fluentui-system-filled/Document'
import {Speaker2} from '@styled-icons/fluentui-system-filled/Speaker2'
import { v4 as uuidv4 } from 'uuid'
export const lessonTypes = {
  text: {
    label: "Text", 
    icon: TextLeft,
    getDefaultContent: () => (
      { blocks: [{id: uuidv4(), type:'text'}]}
    )
  },
  video: {
    label: "Video",
    icon: Video,
    getDefaultContent: () => (
      { blocks: [{
        id: uuidv4(), type:'video',
        properties: {
          url: ''
        }
      }]}
    )
  },
  image: {
    label: "Image",
    icon: Image,
    getDefaultContent: () => (
      { blocks: [{id: uuidv4(), type:'image'}]}
    )
  },
  document: {
    label: "Document",
    icon: Document,
    getDefaultContent: () => (
      { blocks: [{id: uuidv4(), type:'document'}]}
    )
  },
  audio: {
    label: "Audio",
    icon: Speaker2,
    getDefaultContent: () => (
      { blocks: [{id: uuidv4(), type:'audio'}]}
    )
  },
  scorm: {
    label: "SCORM",
    icon: Box,
    getDefaultContent: () => (
      { blocks: [{
        id: uuidv4(), type:'package',
        properties: {
          url: ''
        }
      }]}
    )
  },
  freeform: {
    label: "Freeform",
    icon: Bricks,
    getDefaultContent: () => (
      { blocks: []}
    )
  },
  quiz: {
    label: "Quiz",
    icon: Quiz,
    getDefaultContent: () => (
      { blocks: [{id: uuidv4(), type:'text'}]}
    )
  },
}


import {TextLeft, Bricks} from '@styled-icons/bootstrap'
import {Text, Box, Video, List, Image, Document} from '@styled-icons/fluentui-system-filled'
import {Assignment} from '@styled-icons/material'
import {Quiz} from '@styled-icons/material-rounded/Quiz'
import {Speaker2} from '@styled-icons/fluentui-system-filled/Speaker2'
import { v4 as uuidv4 } from 'uuid'
export const lessonTypes = {
  text: {
    label: "Text", 
    icon: TextLeft,
    content: { blocks: [{id: uuidv4(), type:'text'}]}
  },
  video: {
    label: "Video",
    icon: Video,
    content: { blocks: [{
      id: uuidv4(), type:'video',
      properties: {
        url: ''
      }
    }]}
  },
  image: {
    label: "Image",
    icon: Image,
    content: { blocks: [{id: uuidv4(), type:'image'}]}
  },
  document: {
    label: "Document",
    icon: Document,
    content: { blocks: [{id: uuidv4(), type:'document'}]}
  },
  audio: {
    label: "Audio",
    icon: Speaker2,
    content: { blocks: [{id: uuidv4(), type:'audio'}]}
  },
  scorm: {
    label: "SCORM",
    icon: Box,
    content: { blocks: [{
      id: uuidv4(), type:'package',
      properties: {
        url: ''
      }
    }]}
  },
  freeform: {
    label: "Freeform",
    icon: Bricks,
    content: { blocks: []}
  },
  quiz: {
    label: "Quiz",
    icon: Quiz,
    content: { blocks: [{id: uuidv4(), type:'text'}]}
  },
}


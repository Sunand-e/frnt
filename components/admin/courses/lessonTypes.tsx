import {TextLeft, Bricks} from '@styled-icons/bootstrap'
import {Text, Box, Video, List, Image, Document} from '@styled-icons/fluentui-system-filled'
import {Assignment} from '@styled-icons/material'
import {Quiz} from '@styled-icons/material-rounded/Quiz'
import {Speaker2} from '@styled-icons/fluentui-system-filled/Speaker2'
export const lessonTypes = {
  text: {
    label: "Text", 
    icon: TextLeft,
    content: { blocks: [{type:'text'}]}
  },
  video: {
    label: "Video",
    icon: Video,
    content: { blocks: [{type:'video'}]}
  },
  image: {
    label: "Image",
    icon: Image,
    content: { blocks: [{type:'image'}]}
  },
  document: {
    label: "Document",
    icon: Document,
    content: { blocks: [{type:'document'}]}
  },
  audio: {
    label: "Audio",
    icon: Speaker2,
    content: { blocks: [{type:'audio'}]}
  },
  scorm: {
    label: "SCORM",
    icon: Box,
    content: { blocks: [{
      type:'package',
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
    content: { blocks: [{type:'text'}]}
  },
}


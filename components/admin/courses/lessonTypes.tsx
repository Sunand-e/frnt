import {TextLeft, Bricks} from '@styled-icons/bootstrap'
import {Text, Box, Video, List, Image, Document} from '@styled-icons/fluentui-system-filled'
import {Assignment} from '@styled-icons/material'
import {Quiz} from '@styled-icons/material-rounded/Quiz'
export const lessonTypes = [
  {
    value: "Text",
    label: "Text", 
    icon: TextLeft,
    contentType: 'text', 
    content: { blocks: [{type:'text'}]}
  },
  {
    value: "Video",
    label: "Video",
    icon: Video,
    contentType: 'video', 
    content: { blocks: [{type:'video'}]}
  },
  {
    value: "Image",
    label: "Image",
    icon: Image,
    contentType: 'text', 
    content: { blocks: [{type:'image'}]}
  },
  {
    value: "Document",
    label: "Document",
    icon: Document,
    contentType: 'text', 
    content: { blocks: [{type:'text'}]}
  },
  {
    value: "SCORM",
    label: "SCORM",
    icon: Box,
    contentType: 'text', 
    content: { blocks: [{type:'package'}]}
  },
  // {
  //   value: "Assignment",
  //   label: "Assignment",
  //   icon: Assignment,
  //   contentType: 'text', 
  //   content: { blocks: [{type:'text'}]}
  // },
  {
    value: "Freeform",
    label: "Freeform",
    icon: Bricks,
    contentType: 'text', 
    content: { blocks: [{type:'text'}]}
  },
  {
    value: "Quiz",
    label: "Quiz",
    icon: Quiz,
    contentType: 'text', 
    content: { blocks: [{type:'text'}]}
  },
]


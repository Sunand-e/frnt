import {TextLeft, Bricks} from '@styled-icons/bootstrap'
import {Text, Box, Video, List, Image, Document, Speaker2} from '@styled-icons/fluentui-system-filled'
import {Assignment} from '@styled-icons/material'
import {Quiz} from '@styled-icons/material-rounded/Quiz'
import { FlowChart } from '@styled-icons/remix-editor'

export const libraryItemTypes = {
  guide: {
    label: "Guide", 
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
    content: { blocks: [{type:'text'}]}
  },
  podcast: {
    label: 'Podcast',
    icon: Speaker2,
    content: { blocks: [{type:'text'}]}
  },
  process_flow: {
    label: 'Process Flow',
    icon: FlowChart,
    content: { blocks: [{type:'text'}]}
  },
}


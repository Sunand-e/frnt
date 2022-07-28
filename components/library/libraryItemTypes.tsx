import {TextLeft, Bricks} from '@styled-icons/bootstrap'
import {Text, Box, Video, List, Image, Document, Speaker2} from '@styled-icons/fluentui-system-filled'
import {Assignment} from '@styled-icons/material'
import {Quiz} from '@styled-icons/material-rounded/Quiz'
import { FlowChart } from '@styled-icons/remix-editor'

export const libraryItemTypes = {
  guide: {
    label: "Guide", 
    readMoreLabel: "Read Guide", 
    icon: TextLeft,
    content: { blocks: [{type:'text'}]}
  },
  video: {
    label: "Video",
    readMoreLabel: 'Watch now',
    icon: Video,
    content: { blocks: [{type:'video'}]}
  },
  image: {
    label: "Image",
    readMoreLabel: "View image",
    icon: Image,
    content: { blocks: [{type:'image'}]}
  },
  document: {
    label: "Document",
    readMoreLabel: 'View document',
    icon: Document,
    content: { blocks: [{type:'text'}]}
  },
  podcast: {
    label: 'Podcast',
    readMoreLabel: 'Listen now',
    icon: Speaker2,
    content: { blocks: [{type:'text'}]}
  },
  process_flow: {
    label: 'Process Flow',
    readMoreLabel: 'Get started',
    icon: FlowChart,
    content: { blocks: [{type:'text'}]}
  },
}


import {TextLeft, Bricks} from '@styled-icons/bootstrap'
import {Text, Box, Video, List, Image, Document, Speaker2} from '@styled-icons/fluentui-system-filled'
import {Link} from '@styled-icons/entypo/Link'
import {Assignment} from '@styled-icons/material'
import {Quiz} from '@styled-icons/material-rounded/Quiz'
import { FlowChart } from '@styled-icons/remix-editor'

export const resourceTypes = {
  // guide: {
  //   label: "Guide", 
  //   readMoreLabel: "Read Guide", 
  //   icon: TextLeft,
  //   content: { blocks: [{type:'text'}]}
  // },
  document: {
    titleLabel: "Document name",
    chooseLabel: "Choose a document",
    label: "Document",
    readMoreLabel: 'View document',
    icon: Document,
    content: { blocks: [{type:'text'}]}
  },
  video: {
    titleLabel: "Video title",
    chooseLabel: "Choose a video",
    label: "Video",
    readMoreLabel: 'Watch now',
    icon: Video,
    content: { blocks: [{type:'video'}]}
  },
  image: {
    titleLabel: "Image title",
    chooseLabel: "Choose an image",
    label: "Image",
    readMoreLabel: "View image",
    icon: Image,
    content: { blocks: [{type:'image'}]}
  },
  audio: {
    titleLabel: "Audio title",
    chooseLabel: "Choose audio file",
    label: 'Audio',
    readMoreLabel: 'Listen now',
    icon: Speaker2,
    content: { blocks: [{type:'audio'}]}
  },
  link: {
    titleLabel: "Link title",
    chooseLabel: "Enter URL",
    label: 'Link',
    readMoreLabel: 'Visit link',
    icon: Link,
    content: { blocks: [{type:'button'}]}
  },
  // process_flow: {
  //   label: 'Process Flow',
  //   readMoreLabel: 'Get started',
  //   icon: FlowChart,
  //   content: { blocks: [{type:'text'}]}
  // },
}


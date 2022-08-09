import {TextLeft, Bricks} from '@styled-icons/bootstrap'
import {Text, Box, Video, List, Image, Document, Speaker2} from '@styled-icons/fluentui-system-filled'
import {Assignment} from '@styled-icons/material'
import {Quiz} from '@styled-icons/material-rounded/Quiz'
import { FlowChart } from '@styled-icons/remix-editor'

export const eventItemTypes = {
  physicalEvent: {
    label: "Physical Event",
    readMoreLabel: "Physical Event",
    icon: TextLeft,
    content: { blocks: [{type:'text'}]}
  },
  virtualEvent: {
    label: "Virtual Event",
    readMoreLabel: 'Virtual Event',
    icon: TextLeft,
    content: { blocks: [{type:'text'}]}
  }
}


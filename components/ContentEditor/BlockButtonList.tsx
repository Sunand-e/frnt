import styled from 'styled-components'
import {Text} from '@styled-icons/fluentui-system-filled/Text'
import {Box} from '@styled-icons/fluentui-system-filled/Box'
import {Video} from '@styled-icons/fluentui-system-filled/Video'
import {List} from '@styled-icons/fluentui-system-filled/List'
import {Image} from '@styled-icons/fluentui-system-filled/Image'

const BlockButtonList = [
  {
    type: 'multi-text',
    text: 'Text',
    icon: Text,
  },
  {
    type: 'p',
    text: 'List',
    icon: List,
  },
  {
    type: 'image',
    text: 'Image',
    icon: Image,
  },
  {
    type: 'media_embed',
    text: 'Video',
    icon: Video,
  },
  {
    text: 'SCORM / xAPI',
    type: 'scormxapi',
    icon: Box,
  },
]

export default BlockButtonList
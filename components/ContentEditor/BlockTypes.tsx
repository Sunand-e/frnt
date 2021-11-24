import styled from 'styled-components'
import {Text} from '@styled-icons/fluentui-system-filled/Text'
import {Box} from '@styled-icons/fluentui-system-filled/Box'
import {Video} from '@styled-icons/fluentui-system-filled/Video'
import {List} from '@styled-icons/fluentui-system-filled/List'
import {Image} from '@styled-icons/fluentui-system-filled/Image'
import TextBlock from './blocks/TextBlock/TextBlock'
import HeaderBlock from './blocks/HeaderBlock/HeaderBlock'
import ListBlock from './blocks/ListBlock/ListBlock'
import ImageBlock from './blocks/ImageBlock/ImageBlock'
import VideoBlock from './blocks/VideoBlock/VideoBlock'
import PackageBlock from './blocks/PackageBlock/PackageBlock'

const BlockTypes = [
  {
    name: 'header',
    text: 'header',
    component: HeaderBlock,
    icon: Text,
    defaultProperties: {
      content: [{children: [{text:''}]}]
    }
  },
  {
    name: 'text',
    text: 'Text',
    component: TextBlock,
    icon: Text,
    defaultProperties: {
      content: [{children: [{text:''}]}]
    }
  },
  {
    name: 'list',
    text: 'List',
    component: ListBlock,
    icon: List,
    defaultProperties: {
      content: [{children: [{text:''}]}]
    }
  },
  {
    name: 'image',
    text: 'Image',
    component: ImageBlock,
    icon: Image,
    defaultProperties: {
      content: [{children: [{text:''}]}]
    }
  },
  {
    name: 'video',
    text: 'Video',
    component: VideoBlock,
    icon: Video,
    defaultProperties: {
      content: [{children: [{text:''}]}]
    }
  },
  {
    text: 'SCORM / xAPI',
    name: 'package',
    component: PackageBlock,
    icon: Box,
    defaultProperties: {
      content: [{children: [{text:''}]}]
    }
  },
]

export default BlockTypes
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
import ColumnsBlock from './blocks/ColumnsBlock/ColumnsBlock'

import AddColumn from './Icons/AddColumn';
import PlaceholderBlock from './blocks/ColumnsBlock/PlaceholderBlock'
import Columns from './Icons/Columns'

const blocktypes = {
  header: {
    text: 'header',
    component: HeaderBlock,
    icon: Text,
  },
  text: {
    text: 'Text',
    component: TextBlock,
    icon: Text,
  },
  list: {
    text: 'List',
    component: ListBlock,
    icon: List,
  },
  image: {
    text: 'Image',
    component: ImageBlock,
    icon: Image,
  },
  video: {
    text: 'Video',
    component: VideoBlock,
    icon: Video,
  },
  package: {
    text: 'SCORM / xAPI',
    component: PackageBlock,
    icon: Box,
  }, 
  columns: {
    text: 'Columns',
    component: ColumnsBlock,
    icon: Columns,
    hideFromColumns: true,
  },
  placeholder: {
    text: 'Placeholder',
    component: PlaceholderBlock,
    icon: AddColumn,
    hideFromSelector: true,
  }
}

export default blocktypes
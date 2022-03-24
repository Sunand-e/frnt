import styled from 'styled-components'
import {Text} from '@styled-icons/fluentui-system-filled/Text'
import {Box} from '@styled-icons/fluentui-system-filled/Box'
import {Video} from '@styled-icons/fluentui-system-filled/Video'
import {List} from '@styled-icons/fluentui-system-filled/List'
import {Image} from '@styled-icons/fluentui-system-filled/Image'
import {Document} from '@styled-icons/fluentui-system-filled/Document'

import TextBlock from './blocks/TextBlock/TextBlock'
import HeaderBlock from './blocks/HeaderBlock/HeaderBlock'
import ListBlock from './blocks/ListBlock/ListBlock'
import ImageBlock from './blocks/ImageBlock/ImageBlock'
import VideoBlock from './blocks/VideoBlock/VideoBlock'
import DocumentBlock from './blocks/DocumentBlock/DocumentBlock'
import PackageBlock from './blocks/PackageBlock/PackageBlock'
import ColumnsBlock from './blocks/ColumnsBlock/ColumnsBlock'
import PlaceholderBlock from './blocks/ColumnsBlock/PlaceholderBlock'

import TextBlockEdit from './blocks/TextBlock/TextBlockEdit'
import HeaderBlockEdit from './blocks/HeaderBlock/HeaderBlock'
import ListBlockEdit from './blocks/ListBlock/ListBlockEdit'
import ImageBlockEdit from './blocks/ImageBlock/ImageBlockEdit'
import VideoBlockEdit from './blocks/VideoBlock/VideoBlockEdit'
import DocumentBlockEdit from './blocks/DocumentBlock/DocumentBlockEdit'
import PackageBlockEdit from './blocks/PackageBlock/PackageBlockEdit'
import ColumnsBlockEdit from './blocks/ColumnsBlock/ColumnsBlockEdit'
import PlaceholderBlockEdit from './blocks/ColumnsBlock/PlaceholderBlockEdit'

import AddColumn from './Icons/AddColumn';
import Columns from './Icons/Columns'

const blocktypes = {
  header: {
    text: 'header',
    component: HeaderBlock,
    editComponent: HeaderBlockEdit,
    icon: Text,
    hideFromSelector: true,
  },
  text: {
    text: 'Text',
    component: TextBlock,
    editComponent: TextBlockEdit,
    icon: Text,
  },
  // list: {
  //   text: 'List',
  //   component: ListBlock,
  //   editComponent: ListBlockEdit,
  //   icon: List,
  // },
  image: {
    text: 'Image',
    component: ImageBlock,
    editComponent: ImageBlockEdit,
    icon: Image,
  },
  video: {
    text: 'Video',
    component: VideoBlock,
    editComponent: VideoBlockEdit,
    icon: Video,
  },
  document: {
    text: 'Document',
    component: DocumentBlock,
    editComponent: DocumentBlockEdit,
    icon: Document,
  },
  package: {
    text: 'SCORM / xAPI',
    component: PackageBlock,
    editComponent: PackageBlockEdit,
    icon: Box,
  }, 
  columns: {
    text: 'Columns',
    component: ColumnsBlock,
    editComponent: ColumnsBlockEdit,
    icon: Columns,
  },
  placeholder: {
    text: 'Placeholder',
    component: PlaceholderBlock,
    editComponent: PlaceholderBlockEdit,
    icon: AddColumn,
    hideFromSelector: true,
  }
}

export default blocktypes
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

import TextBlockSettings from './blocks/TextBlock/TextBlockSettings'
import HeaderBlockSettings from './blocks/HeaderBlock/HeaderBlockSettings'
import ListBlockSettings from './blocks/ListBlock/ListBlockSettings'
import ImageBlockSettings from './blocks/ImageBlock/ImageBlockSettings'
import VideoBlockSettings from './blocks/VideoBlock/VideoBlockSettings'
import DocumentBlockSettings from './blocks/DocumentBlock/DocumentBlockSettings'
import PackageBlockSettings from './blocks/PackageBlock/PackageBlockSettings'
import ColumnsBlockSettings from './blocks/ColumnsBlock/ColumnsBlockSettings'
import PlaceholderBlockSettings from './blocks/ColumnsBlock/PlaceholderBlockSettings'

import AddColumn from './Icons/AddColumn';
import Columns from './Icons/Columns'

const blocktypes = {
  header: {
    text: 'header',
    component: HeaderBlock,
    editComponent: HeaderBlockEdit,
    settingsComponent: HeaderBlockSettings,
    icon: Text,
    hideFromSelector: true,
  },
  text: {
    text: 'Text',
    component: TextBlock,
    editComponent: TextBlockEdit,
    settingsComponent: TextBlockSettings,
    icon: Text,
  },
  // list: {
  //   text: 'List',
  //   component: ListBlock,
  //   editComponent: ListBlockEdit,
  // settingsComponent: ListBlockSettings,
  //   icon: List,
  // },
  image: {
    text: 'Image',
    component: ImageBlock,
    editComponent: ImageBlockEdit,
    settingsComponent: ImageBlockSettings,
    icon: Image,
  },
  video: {
    text: 'Video',
    component: VideoBlock,
    editComponent: VideoBlockEdit,
    settingsComponent: VideoBlockSettings,
    icon: Video,
  },
  document: {
    text: 'Document',
    component: DocumentBlock,
    editComponent: DocumentBlockEdit,
    settingsComponent: DocumentBlockSettings,
    icon: Document,
  },
  package: {
    text: 'SCORM / xAPI',
    component: PackageBlock,
    editComponent: PackageBlockEdit,
    settingsComponent: PackageBlockSettings,
    icon: Box,
  }, 
  columns: {
    text: 'Columns',
    component: ColumnsBlock,
    editComponent: ColumnsBlockEdit,
    settingsComponent: ColumnsBlockSettings,
    icon: Columns,
  },
  placeholder: {
    text: 'Placeholder',
    component: PlaceholderBlock,
    editComponent: PlaceholderBlockEdit,
    settingsComponent: PlaceholderBlockSettings,
    icon: AddColumn,
    hideFromSelector: true,
  }
}

export default blocktypes
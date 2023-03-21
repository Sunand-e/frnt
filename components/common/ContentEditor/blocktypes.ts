import styled from 'styled-components'
import {TextT} from '@styled-icons/fluentui-system-filled/TextT'
import {Box} from '@styled-icons/fluentui-system-filled/Box'
import {Video} from '@styled-icons/fluentui-system-filled/Video'
import {Speaker2} from '@styled-icons/fluentui-system-filled/Speaker2'

import {List} from '@styled-icons/fluentui-system-filled/List'
import {Image} from '@styled-icons/fluentui-system-filled/Image'
import {Document} from '@styled-icons/fluentui-system-filled/Document'
import {Expand} from '@styled-icons/material-twotone/Expand'
import {SplitHorizontal} from '@styled-icons/fluentui-system-regular/SplitHorizontal'
import TextBlock from './blocks/TextBlock/TextBlock'
import HeaderBlock from './blocks/HeaderBlock/HeaderBlock'
import ListBlock from './blocks/ListBlock/ListBlock'
import ImageBlock from './blocks/ImageBlock/ImageBlock'
import VideoBlock from './blocks/VideoBlock/VideoBlock'
import AudioBlock from './blocks/AudioBlock/AudioBlock'
import DocumentBlock from './blocks/DocumentBlock/DocumentBlock'
import PackageBlock from './blocks/PackageBlock/PackageBlock'
import ColumnsBlock from './blocks/ColumnsBlock/ColumnsBlock'
import PlaceholderBlock from './blocks/ColumnsBlock/PlaceholderBlock'
import AccordionBlock from './blocks/AccordionBlock/AccordionBlock'
import LineDividerBlock from './blocks/LineDividerBlock/LineDividerBlock'

import TextBlockEdit from './blocks/TextBlock/TextBlockEdit'
import HeaderBlockEdit from './blocks/HeaderBlock/HeaderBlock'
import ListBlockEdit from './blocks/ListBlock/ListBlockEdit'
import ImageBlockEdit from './blocks/ImageBlock/ImageBlockEdit'
import VideoBlockEdit from './blocks/VideoBlock/VideoBlockEdit'
import AudioBlockEdit from './blocks/AudioBlock/AudioBlockEdit'
import DocumentBlockEdit from './blocks/DocumentBlock/DocumentBlockEdit'
import PackageBlockEdit from './blocks/PackageBlock/PackageBlockEdit'
import ColumnsBlockEdit from './blocks/ColumnsBlock/ColumnsBlockEdit'
import PlaceholderBlockEdit from './blocks/ColumnsBlock/PlaceholderBlockEdit'
import AccordionBlockEdit from './blocks/AccordionBlock/AccordionBlockEdit'
import LineDividerBlockEdit from './blocks/LineDividerBlock/LineDividerBlockEdit'

import TextSettings from './blocks/TextBlock/TextSettings'
import HeaderSettings from './blocks/HeaderBlock/HeaderSettings'
import ListSettings from './blocks/ListBlock/ListSettings'
import ImageSettings from './blocks/ImageBlock/ImageSettings'
import VideoSettings from './blocks/VideoBlock/VideoSettings'
import AudioSettings from './blocks/AudioBlock/AudioSettings'
import DocumentSettings from './blocks/DocumentBlock/DocumentSettings'
import PackageSettings from './blocks/PackageBlock/PackageSettings'
import ColumnsSettings from './blocks/ColumnsBlock/ColumnsSettings'
import PlaceholderSettings from './blocks/ColumnsBlock/PlaceholderSettings'
import AccordionSettings from './blocks/AccordionBlock/AccordionSettings'
import LineDividerSettings from './blocks/LineDividerBlock/LineDividerSettings'

import AddColumn from './Icons/AddColumn';
import Columns from './Icons/Columns'

const blocktypes = {
  // header: {
  //   text: 'Header',
  //   component: HeaderBlock,
  //   editComponent: HeaderBlockEdit,
  //   settingsComponent: HeaderSettings,
  //   icon: Text,
  //   hideFromSelector: true,
  // },
  text: {
    name: 'text',
    text: 'Text',
    component: TextBlock,
    editComponent: TextBlockEdit,
    settingsComponent: TextSettings,
    icon: TextT,
  },
  // list: {
  //   text: 'List',
  //   component: ListBlock,
  //   editComponent: ListBlockEdit,
  // settingsComponent: ListSettings,
  //   icon: List,
  // },
  image: {
    text: 'Image',
    component: ImageBlock,
    editComponent: ImageBlockEdit,
    settingsComponent: ImageSettings,
    icon: Image,
  },
  video: {
    text: 'Video',
    component: VideoBlock,
    editComponent: VideoBlockEdit,
    settingsComponent: VideoSettings,
    icon: Video,
  },
  audio: {
    text: 'Audio',
    component: AudioBlock,
    editComponent: AudioBlockEdit,
    settingsComponent: AudioSettings,
    icon: Speaker2,
  },
  document: {
    text: 'Document',
    component: DocumentBlock,
    editComponent: DocumentBlockEdit,
    settingsComponent: DocumentSettings,
    icon: Document,
  },
  package: {
    text: 'SCORM / xAPI',
    component: PackageBlock,
    editComponent: PackageBlockEdit,
    settingsComponent: PackageSettings,
    icon: Box,
  }, 
  columns: {
    text: 'Columns',
    component: ColumnsBlock,
    editComponent: ColumnsBlockEdit,
    settingsComponent: ColumnsSettings,
    icon: Columns,
  },
  placeholder: {
    text: 'Placeholder',
    component: PlaceholderBlock,
    editComponent: PlaceholderBlockEdit,
    settingsComponent: PlaceholderSettings,
    icon: AddColumn,
    hideFromSelector: true,
  },
  // accordion: {
  //   text: 'Accordion',
  //   component: AccordionBlock,
  //   editComponent: AccordionBlockEdit,
  //   settingsComponent: AccordionSettings,
  //   icon: Expand
  // },
  linedivider: {
    text: 'Line Divider',
    component: LineDividerBlock,
    editComponent: LineDividerBlockEdit,
    settingsComponent: LineDividerSettings,
    icon: SplitHorizontal
  }
}

export default blocktypes

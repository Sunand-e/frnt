import styled from 'styled-components'
import {TextT} from '@styled-icons/fluentui-system-filled/TextT'
import {Box} from '@styled-icons/fluentui-system-filled/Box'
import {Video} from '@styled-icons/fluentui-system-filled/Video'
import {Speaker2} from '@styled-icons/fluentui-system-filled/Speaker2'
import {QuestionMarkCircle} from '@styled-icons/heroicons-outline/QuestionMarkCircle'
import {List} from '@styled-icons/fluentui-system-filled/List'
import {Image} from '@styled-icons/fluentui-system-filled/Image'
import {Document} from '@styled-icons/fluentui-system-filled/Document'
import {Expand} from '@styled-icons/material-twotone/Expand'
import {SplitHorizontal} from '@styled-icons/fluentui-system-regular/SplitHorizontal'
import {Columns} from '@styled-icons/octicons/Columns'
import {LineHorizontal1} from '@styled-icons/fluentui-system-filled/LineHorizontal1'

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
import { ReactComponentElement, ReactNode } from 'react'
import Spacer from './blocks/Spacer/Spacer'
import QuestionBlockEdit from './blocks/QuestionBlock/QuestionBlockEdit'
import QuestionSettings from './blocks/QuestionBlock/QuestionSettings'

export type BlockType = {
  name: string,
  text: string,
  component: React.FC<any>,
  editComponent: React.FC<any>,
  settingsComponent: React.FC<any>,
  icon: React.FC<any>,
  hideFromSelector?: boolean
}

export type BlockTypes = {
  [key: string]: BlockType
}

const blocktypes: BlockTypes = {
  // header: {
  //   text: 'Header',
  //   component: HeaderBlock,
  //   editComponent: HeaderBlockEdit,
  //   settingsComponent: HeaderSettings,
  //   icon: Text,
  //   hideFromSelector: true,
  // },
  spacer: {
    name: 'spacer',
    text: 'Drag',
    component: Spacer,
    editComponent: Spacer,
    settingsComponent: TextSettings,
    icon: TextT,
    hideFromSelector: true
  },
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
  'image': {
    text: 'Image',
    name: 'image',
    component: ImageBlock,
    editComponent: ImageBlockEdit,
    settingsComponent: ImageSettings,
    icon: Image,
  },
  'video': {
    text: 'Video',
    name: 'video',
    component: VideoBlock,
    editComponent: VideoBlockEdit,
    settingsComponent: VideoSettings,
    icon: Video,
  },
  audio: {
    text: 'Audio',
    name: 'audio',
    component: AudioBlock,
    editComponent: AudioBlockEdit,
    settingsComponent: AudioSettings,
    icon: Speaker2,
  },
  document: {
    text: 'Document',
    name: 'document',
    component: DocumentBlock,
    editComponent: DocumentBlockEdit,
    settingsComponent: DocumentSettings,
    icon: Document,
  },
  // package: {
  //   text: 'SCORM / xAPI',
  //   name: 'package',
  //   component: PackageBlock,
  //   editComponent: PackageBlockEdit,
  //   settingsComponent: PackageSettings,
  //   icon: Box,
  // }, 
  question: {
    text: 'Question',
    name: 'question',
    component: PackageBlock,
    editComponent: QuestionBlockEdit,
    settingsComponent: QuestionSettings,
    icon: QuestionMarkCircle,
  }, 
  columns: {
    text: 'Columns',
    name: 'columns',
    component: ColumnsBlock,
    editComponent: ColumnsBlockEdit,
    settingsComponent: ColumnsSettings,
    icon: Columns,
  },
  placeholder: {
    text: 'Placeholder',
    name: 'placeholder',
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
    name: 'linedivider',
    component: LineDividerBlock,
    editComponent: LineDividerBlockEdit,
    settingsComponent: LineDividerSettings,
    icon: LineHorizontal1
  }
}

export default blocktypes

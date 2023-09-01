import styled from 'styled-components'
import {TextT} from '@styled-icons/fluentui-system-regular/TextT'
import {Heading} from '@styled-icons/remix-editor/Heading'

import {Box} from '@styled-icons/fluentui-system-regular/Box'
import {Video} from '@styled-icons/fluentui-system-regular/Video'
import {Speaker2} from '@styled-icons/fluentui-system-regular/Speaker2'
import {QuestionMarkCircle} from '@styled-icons/heroicons-outline/QuestionMarkCircle'
import {List} from '@styled-icons/fluentui-system-regular/List'
import {Image} from '@styled-icons/fluentui-system-regular/Image'
import {Document} from '@styled-icons/fluentui-system-regular/Document'
import {Expand} from '@styled-icons/material-twotone/Expand'
import {SplitHorizontal} from '@styled-icons/fluentui-system-regular/SplitHorizontal'
import {Columns} from '@styled-icons/octicons/Columns'
import {LineHorizontal1} from '@styled-icons/fluentui-system-regular/LineHorizontal1'
import {Tabs} from '@styled-icons/fluentui-system-regular/Tabs'
import {Carousel} from '@styled-icons/boxicons-regular/Carousel'
import {Flip2Outline} from '@styled-icons/evaicons-outline/Flip2Outline'

import TextBlock from './blocks/TextBlock/TextBlock'
import HeadingBlock from './blocks/HeadingBlock/HeadingBlock'
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
import HeadingBlockEdit from './blocks/HeadingBlock/HeadingBlockEdit'
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
import HeadingSettings from './blocks/HeadingBlock/HeadingSettings'
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
import QuestionBlock from './blocks/QuestionBlock/QuestionBlock'
import TabsBlock from './blocks/TabsBlock/TabsBlock'
import TabsBlockEdit from './blocks/TabsBlock/TabsBlockEdit'
import { TabsSettings } from './blocks/TabsBlock/TabsSettings'
import CarouselBlock from './blocks/CarouselBlock/CarouselBlock'
import CarouselBlockEdit from './blocks/CarouselBlock/CarouselBlockEdit'
import { CarouselSettings } from './blocks/CarouselBlock/CarouselBlockSettings'
import FlipBoxesBlock from './blocks/FlipBoxesBlock/FlipBoxesBlock'
import FlipBoxesBlockEdit from './blocks/FlipBoxesBlock/FlipBoxesBlockEdit'
import { FlipBoxesSettings } from './blocks/FlipBoxesBlock/FlipBoxesSettings'
import TextAndImageBlock from './blocks/TextAndImageBlock/TextAndImageBlock'
import TextAndImageBlockEdit from './blocks/TextAndImageBlock/TextAndImageBlockEdit'
import TextAndImageSettings from './blocks/TextAndImageBlock/TextAndImageSettings'
import TextOnImageBlock from './blocks/TextOnImageBlock/TextOnImageBlock'
import TextOnImageBlockEdit from './blocks/TextOnImageBlock/TextOnImageBlockEdit'
import TextOnImageSettings from './blocks/TextOnImageBlock/TextOnImageSettings'


export type BlockType = {
  name: string,
  text: string,
  component: React.FC<any>,
  editComponent: React.FC<any>,
  settingsComponent: React.FC<any>,
  icon: React.FC<any>,
  defaultProperties?: any,  
  canHaveBgImage?: boolean,
  alwaysHasBgImage?: boolean,
  editorOptions?
  hideFromSelector?: boolean
}

export type BlockTypes = {
  [key: string]: BlockType
}

const blocktypes: BlockTypes = {
  heading: {
    name: 'heading',
    text: 'Heading',
    component: HeadingBlock,
    editComponent: HeadingBlockEdit,
    settingsComponent: HeadingSettings,
    icon: Heading,
    defaultProperties: {
      properties: {
        paddingBottom: '0px',
      }
    }
    // hideFromSelector: true,
  },
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
    icon: TextT
  },
  textOnImage: {
    text: 'Text on image',
    name: 'textOnImage',
    canHaveBgImage: true,
    alwaysHasBgImage: true,
    component: TextOnImageBlock,
    editComponent: TextOnImageBlockEdit,
    settingsComponent: TextOnImageSettings,
    icon: Image,
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
    component: QuestionBlock,
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
  textAndImage: {
    name: 'textAndImage',
    text: 'Text and Image',
    component: TextAndImageBlock,
    editComponent: TextAndImageBlockEdit,
    settingsComponent: TextAndImageSettings,
    icon: Expand,
    hideFromSelector: true,
    editorOptions: {
      defaultAlignment: 'left'
    }
  },
  accordion: {
    name: 'accordion',
    text: 'Accordion',
    component: AccordionBlock,
    editComponent: AccordionBlockEdit,
    settingsComponent: AccordionSettings,
    icon: Expand
  },
  tabs: {
    name: 'tabs',
    text: 'Tabs',
    component: TabsBlock,
    editComponent: TabsBlockEdit,
    settingsComponent: TabsSettings,
    icon: Tabs
  },
  carousel: {
    name: 'carousel',
    text: 'Carousel',
    component: CarouselBlock,
    editComponent: CarouselBlockEdit,
    settingsComponent: CarouselSettings,
    icon: Carousel
  },
  // flipboxes: {
  //   name: 'flipboxes',
  //   text: 'Flip Boxes',
  //   component: FlipBoxesBlock,
  //   editComponent: FlipBoxesBlockEdit,
  //   settingsComponent: FlipBoxesSettings,
  //   icon: Flip2Outline
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

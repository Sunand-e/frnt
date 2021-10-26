import styled from 'styled-components'
import {TextAdd} from '@styled-icons/fluentui-system-filled/TextAdd'
import BlockButton from './BlockButton'

const BlockSelector = ({children}) => {
  return (
    <div className="flex w-full flex-wrap">
      <BlockButton type="text">
        <TextAdd className="h-10" />
        Text
      </BlockButton>
      <BlockButton type="text">
        <TextAdd className="h-10" />
        List
      </BlockButton>
      <BlockButton type="text">
        <TextAdd className="h-10" />
        Image
      </BlockButton>
      <BlockButton type="text">
        <TextAdd className="h-10" />
        Video
      </BlockButton>
      <BlockButton type="text">
        <TextAdd className="h-10" />
        SCORM / xAPI
      </BlockButton>
    </div>
  )
}

export default BlockSelector
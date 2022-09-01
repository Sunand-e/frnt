import blocktypes from './blocktypes'
import BlockTypeButton from './BlockTypeButton'
import PackageSelectModal from './blocks/PackageBlock/PackageSelectModal'
import { CSSProperties, StyleHTMLAttributes, useContext } from 'react';
import { ModalContext } from '../../context/modalContext';
import { v4 as uuidv4 } from 'uuid';
import useBlockEditor from './useBlockEditor';
import VideoUrlSelect from './blocks/VideoBlock/VideoUrlSelect';

interface block {
  type: string,
  id: string,
  children?: block[]
  properties?: {[key: string]: any}
  widths?: {[key: string]: any}
}

interface BlockSelectorProps {
  block?,
  replace?: boolean, 
  exclude?: any[],
  className?: string,
  onSelect?:()=>void,
  style: CSSProperties
}
const BlockSelector = ({
  block=null, 
  replace=false, 
  exclude=[], 
  className='',
  onSelect = ():void => null,
  style={}
}: BlockSelectorProps) => {

  const { blocks, addBlock } = useBlockEditor(block)
  const { handleModal, closeModal } = useContext(ModalContext)

  const handleAddVideo = (newBlock) => {
    handleModal({
      title: `Add video`,
      size: 'md',
      content: (
        <VideoUrlSelect onVideoSelect={(url) => {
          const videoBlock = {
            ...newBlock,
            properties: {
              ...newBlock.properties,
              url
            }
          }
          addBlock(videoBlock, replace)
        }} />
      )
    })
  }


  
  const handleSelectType = (type) => {
    const newBlock: block = {
      type: type.name,
      id: uuidv4(),
      properties: {}
    }
    onSelect?.()
    switch(type.name) {
      case 'package': {
        handleModal({
          title: `Choose package`,
          content: <PackageSelectModal block={block} />,
          size: 'lg'
        })
        break;
      }
      case 'video': {
        handleAddVideo(newBlock)
        break;
      }
      case 'text': {
        addBlock(newBlock, replace)
        break;
      }
      case 'columns': {
        newBlock.children = [
          { type: 'placeholder', id: uuidv4() },
          { type: 'placeholder', id: uuidv4() }
        ]
        newBlock.widths = [6,6]
        addBlock(newBlock, replace)
        break;
      }
      default: {
        addBlock(newBlock, replace)
      }
    }
  }

  let blockButtons = []
  let btnIndex = 0;
  for(const blockTypeName in blocktypes) {

    if(!exclude.includes(blockTypeName)) {
      const blockType = blocktypes[blockTypeName]
      if(!blockType.hideFromSelector) {
        blockButtons.push({
          ...blockType,
          name: blockTypeName
        })
      }
    }
  }

  const BlockTypeButtons = blockButtons.map((type, index) => {
    const isDisabled = type.name === 'package' && blocks.some(({type}) => type === 'package')
    return(
      <BlockTypeButton
        key={index}
        type={type}
        isDisabled={isDisabled}
        onSelect={handleSelectType}
      />
    )
  })

  return (
    <div style={style} className={`flex flex-col text-center text-main-secondary ${className}`}>
      <div 
        className="mb-4 flex flex-wrap gap-4 justify-center align-center items-center sm:grid-cols-3 lg:grid-cols-6 text-sm">
        { BlockTypeButtons }
      </div>
    </div>
  )
};

export default BlockSelector

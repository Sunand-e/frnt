import blocktypes, { BlockType } from './blocktypes'
import BlockTypeButton from './BlockTypeButton'
import { CSSProperties } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useBlockEditor from './useBlockEditor';
import VideoUrlSelect from './blocks/VideoBlock/VideoUrlSelect';
import { closeModal, handleModal } from '../../../stores/modalStore';
import PackageLibrary from '../../packages/PackageLibrary';
import { Block, useBlockStore } from './useBlockStore';

interface BlockSelectorProps {
  block?: Block,
  replace?: boolean, 
  exclude?: any[],
  className?: string,
  blockButtonClassName?: string,
  onSelect?:()=>void,
  style?: CSSProperties
}
const BlockSelector = ({
  block=null, 
  replace=false, 
  exclude=[], 
  className='',
  blockButtonClassName='',
  onSelect = ():void => null,
  style={}
}: BlockSelectorProps) => {

  const { blocks, addBlock } = useBlockEditor(block)
  const sidebarFieldsRegenKey = useBlockStore(state => state.sidebarFieldsRegenKey)

  // const {isOver, setNodeRef} = useDroppable({
  //   id: 'blockSelector',
  // });

  const handleAddVideo = (newBlock: Block) => {
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

  const handlePackageSelect = (module) => {
    const newBlock = {
      type: 'package',
      id: uuidv4(),
      properties: {
        url: module.launchUrl,
        moduleId: module.id,
      }
    }
    addBlock(newBlock)
    // block ? updateBlock(block, newBlock) : insertBlock(newBlock, blocks.length)
    closeModal()
  }
  
  const handleSelectType = (type: BlockType) => {
    const newBlock: Block = {
      type: type.name,
      id: uuidv4(),
      properties: {}
    }
    onSelect?.()
    switch(type.name) {
      case 'package': {
        handleModal({
          title: `Choose package`,
          content: <PackageLibrary onItemSelect={handlePackageSelect} />,
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
        className={blockButtonClassName}
      />
    )
  })

  return (
    <div style={style} key={sidebarFieldsRegenKey} className={className}>
      { BlockTypeButtons }
{/*       
      {createPortal(
        <DragOverlay dropAnimation={dropAnimation}>
          <BlockTypeButton
            type={blocktypes['text']}
            isDisabled={false}
            onSelect={handleSelectType}
            className={blockButtonClassName}
          />
        </DragOverlay>,
        document.body
      )} */}
    </div>
  )
};

export default BlockSelector

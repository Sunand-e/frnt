import blocktypes, { BlockType } from './blocktypes'
import BlockTypeButton from './BlockTypeButton'
import { CSSProperties } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useBlockEditor from './useBlockEditor';
import VideoUrlSelect from './blocks/VideoBlock/VideoUrlSelect';
import { closeModal, handleModal } from '../../../stores/modalStore';
import PackageLibrary from '../../packages/PackageLibrary';
import { Block, createBlock, useBlockStore } from './useBlockStore';
import MediaLibrary from '../../media/MediaLibrary';

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

  const handleVideoSelect = (url) => {
    const videoBlock = createBlock({
      type: 'video',
      properties: {
        url,
      }
    })
    addBlock(videoBlock, replace)
    closeModal()
  }

  const handleAddVideo = () => {
    handleModal({
      title: `Add video`,
      size: 'md',
      content: (
        <VideoUrlSelect onVideoSelect={handleVideoSelect} />
      )
    })
  }

  const handlePackageSelect = (scormPackage) => {
    const newBlock = createBlock({
      type: 'package',
      properties: {
        url: scormPackage.launchUrl,
        moduleId: scormPackage.id,
        title: scormPackage.title,
      }
    })
    addBlock(newBlock)
    // block ? updateBlock(block, newBlock) : insertBlock(newBlock, blocks.length)
    closeModal()
  }
  
  const handleImageSelect = (image) => {
    const newBlock = createBlock({
      type: 'image',
      properties: {
        url: image?.location,
        mediaId: image?.id,
      }
    })
    addBlock(newBlock)
    // block ? updateBlock(block, newBlock) : insertBlock(newBlock, blocks.length)
    closeModal()
  }
  
  const handleSelectType = (type: BlockType) => {

    let newBlock: Block = createBlock({
      type: type.name,
    })

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
      case 'image': {
        handleModal({
          title: `Choose image`,
          content: <MediaLibrary onItemSelect={handleImageSelect} typeFilter={['image']} />,
          size: 'lg'
        })
        break;
      }
      case 'video': {
        handleAddVideo()
        break;
      }
      case 'text': {
        addBlock(newBlock, replace)
        break;
      }
      case 'question': {
        newBlock.properties = {
          id: uuidv4(),          
          paddingTop: '0px',
          paddingBottom: '0px',
          question: {
            content: ''
          },
          answers: [
            {
              id: uuidv4(),
              content: '',
              correct: true
            }
          ]
        }
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
      case 'accordion':
      case 'tabs':
      case 'carousel': {
        newBlock.children = [
          { type: 'textAndImage', id: uuidv4() },
        ]
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

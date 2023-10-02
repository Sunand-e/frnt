import blocktypes, { BlockType } from './blocktypes'
import BlockTypeButton from './BlockTypeButton'
import { CSSProperties } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useBlockEditor from './useBlockEditor';
import VideoUrlSelect from './blocks/VideoBlock/VideoUrlSelect';
import { closeModal, handleModal } from '../../../stores/modalStore';
import PackageLibrary from '../../packages/PackageLibrary';
import { addBlock, Block, createBlock, useBlockStore } from './useBlockStore';
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

  const blocks = useBlockStore(state => state.blocks)
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
    addBlock(videoBlock, replace, block)
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
    addBlock(newBlock, replace, block)
    // block ? updateBlock(block, newBlock) : insertBlock(newBlock, blocks.length)
    closeModal()
  }
  
  
  const handleSelectType = (type: BlockType) => {

    onSelect?.()

    let newBlock: Block = createBlock({
      ...type.defaultProperties,
      type: type.name,
    })

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
        newBlock.style = {
          paddingTop: '30px',
          paddingBottom: '30px',
        }
        break;
      }
      case 'video': {
        handleAddVideo()
        break;
      }
      case 'text': {
        break;
      }
      case 'heading': {
        break;
      }
      case 'question': {
        newBlock.properties = {
          id: uuidv4(),
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

        newBlock.style = {
          paddingTop: '0px',
          paddingBottom: '0px',
        }
        break;
      }
      case 'columns': {
        newBlock.children = [
          createBlock({ type: 'placeholder'}),
          createBlock({ type: 'placeholder'}),
        ]
        newBlock.widths = [6,6]
        break;
      }
      case 'accordion': {
        newBlock.children = [
          createBlock({ 
            type: 'textAndImage',
            style: {
              paddingTop: '0px'
            }
          })
        ]
        break;
      }
      case 'tabs': {
        newBlock.children = [
          createBlock({ 
            type: 'textAndImage',
            editorSettings: {
              defaultAlignment: 'center'
            },
            style: {
              paddingTop: '20px'
            }

          })
        ]
        break;
      }
      case 'carousel': {
        newBlock.children = [
          createBlock({ type: 'textAndImage'})
        ]
        break;
      }
      default: {
      }
    }

    if(!['package', 'video'].includes(type.name)) {
      addBlock(newBlock, replace, block)
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

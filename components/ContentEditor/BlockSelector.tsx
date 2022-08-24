import blocktypes from './blocktypes'
import BlockButton from './BlockButton'
import PackageSelectModal from './blocks/PackageBlock/PackageSelectModal'
import { useContext } from 'react';
import { ModalContext } from '../../context/modalContext';
import { v4 as uuidv4 } from 'uuid';
import cache, { currentContentItemVar } from '../../graphql/cache';
import { ContentFragment } from '../../graphql/queries/allQueries';
import useBlockEditor from './useBlockEditor';
import VideoUrlSelect from './blocks/VideoBlock/VideoUrlSelect';

const BlockSelector = ({
  block=null, 
  replace=false, 
  exclude=[], 
  className='',
  onSelect = ():void => null,
  style
}) => {

  const { blocks, insertBlock, updateBlock, getIndexAndParent, addBlock } = useBlockEditor(block)
  const { handleModal, closeModal } = useContext(ModalContext);


  const handleAddVideo = (embedUrl) => {
    const newBlock = {
      type: 'video',
      id: uuidv4(),
      properties: {
        // this needs to change to insert the url package location!
        // url: '/scorm/golf-examples-multi-sco-scorm-1.2/shared/launchpage.html',
        // url: `${prefix}/scorms/${module.id}//${module.launchUrl}`,
        url: embedUrl
      }
    }
    addBlock(newBlock)
    // block ? updateBlock(block, newBlock) : insertBlock(newBlock, blocks.length)
    closeModal()
  }


  const handleSelectBlock = (newBlock) => {
    onSelect?.()
    switch(newBlock.type) {
      case 'package': {
        handleModal({
          title: `Choose package`,
          content: <PackageSelectModal block={block} />,
          size: 'lg'
        })
        break;
      }
      case 'video': {
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

  const BlockButtons = blockButtons.map((type, index) => {
    const isDisabled = type.name === 'package' && blocks.some(({type}) => type === 'package')
    return(
      <BlockButton
        key={index}
        type={type.name}
        text={type.text}
        Icon={type.icon}
        isDisabled={isDisabled}
        onSelectBlock={handleSelectBlock}
      />
    )
  })

  return (
    <div style={style} className={`flex flex-col text-center text-main-secondary ${className}`}>
      <div 
        className="mb-4 flex flex-wrap gap-4 justify-center align-center items-center sm:grid-cols-3 lg:grid-cols-6 text-sm">
        { BlockButtons }
      </div>
    </div>
  )
};

export default BlockSelector

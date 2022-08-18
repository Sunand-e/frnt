import blocktypes from './blocktypes'
import BlockButton from './BlockButton'
import PackageSelectModal from './blocks/PackageBlock/PackageSelectModal'
import { useContext } from 'react';
import { ModalContext } from '../../context/modalContext';
import { v4 as uuidv4 } from 'uuid';
import cache, { currentContentItemVar } from '../../graphql/cache';
import { ContentFragment } from '../../graphql/queries/allQueries';
import useBlockEditor from './useBlockEditor';
import NewVideoModal from './blocks/VideoBlock/NewVideoModal';

const BlockSelector = ({
  block=null, 
  replace=false, 
  exclude=[], 
  className='',
  onSelect = ():void => null,
  style
}) => {

  const { blocks, insertBlock, updateBlock, getIndexAndParent, addBlock } = useBlockEditor(block)


  const { handleModal } = useContext(ModalContext);

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
          content: <NewVideoModal block={block} />,
          size: 'md'
        })
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

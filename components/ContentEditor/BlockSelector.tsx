import blocktypes from './blocktypes'
import BlockButton from './BlockButton'
import ImageLibraryModal from './blocks/ImageBlock/ImageLibraryModal'
import PackageSelectModal from './blocks/PackageBlock/PackageSelectModal'
import { useContext } from 'react';
import { ModalContext } from '../../context/modalContext';
import { v4 as uuidv4 } from 'uuid';
import cache, { currentContentItemVar } from '../../graphql/cache';
import { ContentFragment } from '../../graphql/queries/allQueries';
import useBlockEditor from './useBlockEditor';

const BlockSelector = ({block=null, replace=false, className=''}) => {

  const { blocks, insertBlock, updateBlock, getIndexAndParent } = useBlockEditor(block)
  const addBlock = (newBlock) => {
    if(block) {
      if(replace) {
        updateBlock(block, newBlock)
      } else {
        const { index, parent } = getIndexAndParent(block)
        insertBlock(newBlock, index + 1, parent, replace)
      }
    } else {
      insertBlock(newBlock, blocks.length, null, replace)
    }
  }

  const { handleModal } = useContext(ModalContext);

  const handleSelectBlock = (newBlock) => {
    switch(newBlock.type) {
      case 'image': {
        handleModal({
          title: `Choose image`,
          content: <ImageLibraryModal onImageSelect={(block) => addBlock(block)} />
        })
        break;
      }
      case 'package': {
        handleModal({
          title: `Choose package`,
          content: <PackageSelectModal />
        })
        break;
      }
      case 'columns': {
        newBlock.children = [
          { type: 'placeholder', id: uuidv4() },
          { type: 'placeholder', id: uuidv4() }
        ]        
        // insertBlock(newBlock, index, null, replace)
        addBlock(newBlock)
        break;
      }
      default: {
        // insertBlock(newBlock, index, null, replace)
        addBlock(newBlock)
      }
    }
  }

  let blockButtons = []
  let btnIndex = 0;
  for(const blockTypeName in blocktypes) {
    const blockType = blocktypes[blockTypeName]
    if(!blockType.hideFromSelector) {
      blockButtons.push({
        ...blockType,
        name: blockTypeName
      })
    }
  }

  const BlockButtons = blockButtons.map((type, index) => <BlockButton 
    key={index}
    type={type.name}
    text={type.text}
    Icon={type.icon}
    onSelectBlock={handleSelectBlock}
  />)

  return (
    <div className={`flex flex-col text-center text-main-dark ${className}`}>
      <div 
        className="flex flex-wrap gap-4 justify-center align-center items-center sm:grid-cols-3 lg:grid-cols-6 text-sm">
        { BlockButtons }
      </div>
    </div>
  )
}

export default BlockSelector
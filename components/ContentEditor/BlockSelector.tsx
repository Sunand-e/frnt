import BlockTypes from './BlockTypes'
import BlockButton from './BlockButton'
import ImageLibraryModal from './blocks/ImageBlock/ImageLibraryModal'
import { useContext } from 'react';
import { ModalContext } from '../../context/modalContext';

const BlockSelector = ({targetIndex, onAddBlock: insertBlockAtIndex}) => {

  const { handleModal } = useContext(ModalContext);

  const handleAddBlock = (block) => {
    switch(block.type) {
      case 'image': {
        handleModal({
          title: `Choose image`,
          content: <ImageLibraryModal />
        })
      
        break;
      }
      default: {
        insertBlockAtIndex(block, targetIndex)
      }
    }
  }

  const BlockButtons = BlockTypes.map((type, index) => (
    <BlockButton 
      key={index}
      type={type.name}
      text={type.text}
      Icon={type.icon}
      onAddBlock={handleAddBlock}
    />
  ))
  
  return (
    <div className="p-4 flex flex-col text-center text-main-dark">
      <h3>New item...</h3>
      <div className="pt-4 flex gap-4 justify-center align-center items-center sm:grid-cols-6 lg:grid-cols-6 text-sm">
        { BlockButtons }
      </div>
    </div>
  )
}

export default BlockSelector
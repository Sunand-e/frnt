import { useContext } from 'react';
import { closeModal, handleModal } from '../../../../../stores/modalStore';
import Button from '../../../Button'
import BlockSelector from '../../BlockSelector';

const PlaceholderBlockEdit = ({block}) => {

  const handleBlockSelect = () => {
    handleModal({
      title: `Choose a block`,
      content: (
        <BlockSelector
          block={block}
          replace={true}
          style={null}
          exclude={['columns','package']}
          onSelect={closeModal}
        />
      )
    })  
  }
  
  return (
    <div className={`flex align-center items-center justify-center h-full min-h-[80px]`}>
      <Button onClick={handleBlockSelect}>Add block</Button>
    </div>
  )
}

export default PlaceholderBlockEdit
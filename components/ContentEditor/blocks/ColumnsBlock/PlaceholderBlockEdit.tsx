import {
  useContext,
  useEffect,
  useState,
} from 'react';
import { ModalContext } from '../../../../context/modalContext';
import cache, { currentContentItemVar } from '../../../../graphql/cache';
import { ContentFragment } from '../../../../graphql/queries/allQueries';
import Button from '../../../Button'
import BlockSelector from '../../BlockSelector';

const PlaceholderBlockEdit = ({block}) => {

  const { handleModal, closeModal } = useContext(ModalContext);

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
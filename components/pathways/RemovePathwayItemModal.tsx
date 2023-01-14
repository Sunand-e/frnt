import { useCallback, useContext } from 'react';
import { ModalContext } from "../../context/modalContext";
import { useModalStore } from '../../stores/modalStore';
import Button from '../common/Button';
import { usePathwayStore } from './usePathwayStore';

const RemovePathwayItemModal = ({item}) => {

  const removeItem = usePathwayStore(state => state.removeItem)
  const { closeModal } = useContext(ModalContext)
  // const closeModal = useModalStore(state => state.closeModal)

  const handleRemoveItem = useCallback(() => {
    removeItem(item)
    closeModal()
  },[removeItem, item])

  return (
    <>
      <p>Are you sure you want to remove 
        <span className='font-bold'> {item.title}</span>
        ?</p>
      <Button onClick={handleRemoveItem}>Remove item</Button>
    </>
  );
}

export default RemovePathwayItemModal
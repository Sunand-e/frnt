import { useCallback, useContext } from 'react';
import { ModalContext } from "../../context/modalContext";
import Button from '../common/Button';
import { usePathwayStore } from './usePathwayStore';

const RemovePathwayItemModal = ({item}) => {

  const removeItem = usePathwayStore(state => state.removeItem)
  const { closeModal } = useContext(ModalContext)

  const handleRemoveItem = useCallback(() => {
    removeItem(item)
    closeModal()
  },[removeItem, item])

  return (
    <>
      <p>Are you sure you want to remove 
        <span className='text-bold'>{item.title}</span>
        ?</p>
      <Button onClick={handleRemoveItem}>Remove item</Button>
    </>
  );
}

export default RemovePathwayItemModal
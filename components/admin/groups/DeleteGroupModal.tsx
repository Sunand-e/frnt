import { useField } from "formik"
import { useContext } from 'react';
import { ModalContext } from "../../../context/modalContext";
import useDeleteGroup from "../../../hooks/groups/useDeleteGroup";
import Button from '../../Button';

const DeleteGroupModal = ({groupId}) => {

  const { deleteGroup } = useDeleteGroup()

  const { closeModal } = useContext(ModalContext)

  const handleDeleteGroup = () => {
    deleteGroup(groupId)
    closeModal()
  }

  return (
    <>
      <p>Are you sure you want to delete this group?</p>
      <p className="font-bold mb-2">This action cannot be undone.</p>
      <Button onClick={handleDeleteGroup}>Delete group</Button>
    </>
  );
}

export default DeleteGroupModal
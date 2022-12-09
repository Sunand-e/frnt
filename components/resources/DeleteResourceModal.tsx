import { useField } from "formik"
import { useContext } from 'react';
import { ModalContext } from "../../context/modalContext";
import useDeleteResource from "../../hooks/resources/useDeleteResource";
import Button from '../common/Button';

const DeleteResourceModal = ({resourceId}) => {

  const { deleteResource } = useDeleteResource()

  const { closeModal } = useContext(ModalContext)

  const handleDelete = () => {
    deleteResource(resourceId)
    closeModal()
  }

  return (
    <>
      <p>Are you sure you want to delete this resource?</p>
      <Button onClick={handleDelete}>Delete resource</Button>
    </>
  );
}

export default DeleteResourceModal
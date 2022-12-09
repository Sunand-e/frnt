import { useField } from "formik"
import { useContext } from 'react';
import { ModalContext } from "../../context/modalContext";
import useDeletePathway from "../../hooks/pathways/useDeletePathway";
import Button from '../common/Button';

const DeletePathwayModal = ({pathwayId}) => {

  const { deletePathway } = useDeletePathway()

  const { closeModal } = useContext(ModalContext)

  const handleDelete = () => {
    deletePathway(pathwayId)
    closeModal()
  }

  return (
    <>
      <p>Are you sure you want to delete this pathway?</p>
      <Button onClick={handleDelete}>Delete pathway</Button>
    </>
  );
}

export default DeletePathwayModal
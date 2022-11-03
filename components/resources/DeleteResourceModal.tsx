import { useField } from "formik"
import { useContext } from 'react';
import { ModalContext } from "../../context/modalContext";
import useDeleteLesson from "../../hooks/lessons/useDeleteLesson";
import Button from '../common/Button';

const DeleteResourceModal = ({lessonId}) => {

  const { deleteLesson } = useDeleteLesson(lessonId)

  const { closeModal } = useContext(ModalContext)

  const handleDeleteLesson = () => {
    deleteLesson()
    closeModal()
  }

  return (
    <>
      <p>Are you sure you want to delete this resource?</p>
      <Button onClick={handleDeleteLesson}>Delete resource</Button>
    </>
  );
}

export default DeleteResourceModal
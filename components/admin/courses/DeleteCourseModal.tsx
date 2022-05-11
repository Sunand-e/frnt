import { useField } from "formik"
import { useContext } from 'react';
import { ModalContext } from "../../../context/modalContext";
import useDeleteCourse from "../../../hooks/courses/useDeleteCourse";
import Button from '../../Button';

const DeleteCourseModal = ({courseId}) => {

  const { deleteCourse } = useDeleteCourse()

  const { closeModal } = useContext(ModalContext)

  const handleDeleteCourse = () => {
    deleteCourse(courseId)
    closeModal()
  }

  return (
    <>
      <p>Are you sure you want to delete this course?</p>
      <p className="font-bold mb-2">This action cannot be undone.</p>
      <Button onClick={handleDeleteCourse}>Delete course</Button>
    </>
  );
}

export default DeleteCourseModal
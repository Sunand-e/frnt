import useDeleteLesson from "../../hooks/lessons/useDeleteLesson";
import { closeModal } from "../../stores/modalStore";
import Button from '../common/Button';

const DeleteLessonModal = ({lessonId}) => {

  const { deleteLesson } = useDeleteLesson(lessonId)

  const handleDeleteLesson = () => {
    deleteLesson()
    closeModal()
  }

  return (
    <>
      <p>Are you sure you want to delete this lesson?</p>
      <Button onClick={handleDeleteLesson}>Delete lesson</Button>
    </>
  );
}

export default DeleteLessonModal
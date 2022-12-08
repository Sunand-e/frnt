import { useContext } from "react"
import ActionsMenu from "../../common/menus/ActionsMenu"
import { ModalContext } from "../../../context/modalContext"
import DeleteCourseModal from "../DeleteCourseModal"

const CourseActionsMenu = ({course}) => {
  const { handleModal } = useContext(ModalContext)
  const editUrl = '/admin/courses/edit'
  const editHref = course?.id && `${editUrl}?id=${course.id}`
  
  const handleDeleteClick = () => {
    handleModal({
      title: `Delete course`,
      content: <DeleteCourseModal courseId={course?.id} />
    })
  }
  const menuItems = [
    { label: 'Edit course', href: editHref },
    { label: <span className="text-red-500">Delete course</span>, onClick: handleDeleteClick },
    // { title: 'Settings', href:'settings' },
  ]
  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
    />
  )
}

export default CourseActionsMenu
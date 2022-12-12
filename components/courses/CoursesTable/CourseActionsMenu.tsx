import ActionsMenu from "../../common/menus/ActionsMenu"
import useDeleteCourse from "../../../hooks/courses/useDeleteCourse"
import useConfirmDelete from "../../../hooks/useConfirmDelete"

const CourseActionsMenu = ({course}) => {

  const editUrl = '/admin/courses/edit'
  const editHref = course?.id && `${editUrl}?id=${course.id}`
  
  const { deleteCourse } = useDeleteCourse()
  const { confirmDelete } = useConfirmDelete({
    type: 'course',
    name: course.title,
    onConfirm: () => deleteCourse(course.id)
  })
  
  const menuItems = [
    { 
      label: 'Edit course', 
      href: editHref,
      capability: 'UpdateCourse'
    },
    {
      label: <span className="text-red-500">Delete course</span>,
      onClick: confirmDelete,
      capability: 'DeleteCourse'
    },
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
import ActionsMenu from "../../common/menus/ActionsMenu"
import useDeleteCourse from "../../../hooks/courses/useDeleteCourse"
import useConfirmDelete from "../../../hooks/useConfirmDelete"
import useDuplicateCourse from "../../../hooks/courses/useDuplicateCourse"

const CourseActionsMenu = ({content: course}) => {

  const editUrl = '/admin/courses/edit'
  const editHref = course?.id && `${editUrl}?id=${course.id}`
  
  const { deleteCourse } = useDeleteCourse()
  const { duplicateCourse } = useDuplicateCourse()
  const { confirmDelete } = useConfirmDelete({
    itemType: 'course',
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
      label: 'Clone course',
      onClick: () => duplicateCourse(course.id),
      capability: 'CreateCourse'
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
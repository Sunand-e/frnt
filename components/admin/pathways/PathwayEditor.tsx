import { useContext } from "react"
import { ModalContext } from "../../../context/modalContext"
import Button from "../../Button"
import CoursesTable from "../courses/CoursesTable/CoursesTable"

const PathwayEditor = () => {


  const { handleModal, closeModal } = useContext(ModalContext)

  const addCourse = () => {
    handleModal({
      title: `Add courses to pathway:`,
      size: 'lg',
      content: <CoursesTable selectable={true} />
    })
  }

  return (
    <>
      <Button onClick={addCourse}>Add a course</Button>
    </>
  )
}

export default PathwayEditor
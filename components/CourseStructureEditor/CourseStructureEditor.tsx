import { SortableTree } from "./SortableTree/SortableTree"

const CourseStructureEditor = (course = {}) => {
  return (
    <SortableTree collapsible indicator removable />
  )
}

export default CourseStructureEditor
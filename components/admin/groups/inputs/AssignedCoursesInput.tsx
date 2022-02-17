import { useState } from "react";
import useGetCourses from "../../../../hooks/courses/useGetCourses";
import DualListBoxInput from "../../../common/inputs/DualListBoxInput"

const AssignedCoursesInput = ({control}) => {

  const { courses } = useGetCourses();
  const [selectedCourses, setSelectedCourses] = useState([])
  
  const coursesOptions = courses?.map(course => {
    return { value: course.id, label: course.title }
  })

  return (
    <>
      { courses && (
        <DualListBoxInput
          label="Assigned courses"
          control={control}
          name="assignedCourses"
          options={coursesOptions}
          selected={selectedCourses}
          onChange={setSelectedCourses}
          lang={{
            availableHeader: 'Available courses',
            selectedHeader: 'Selected courses',
          }}
        />
      )}
    </>
  )
}

export default AssignedCoursesInput
import useGetCourses from "../../../hooks/courses/useGetCourses";
import DualListBoxInput from "../../common/inputs/DualListBoxInput"

const AssignedCoursesInput = ({control, name='assignedCourseIds'}) => {

  const { courses } = useGetCourses();
  
  const coursesOptions = courses?.edges?.map(({node: course}) => {
    return { value: course.id, label: course.title }
  })

  return (
    <>
      { courses && (
        <DualListBoxInput
          label="Assigned courses"
          control={control}
          name={name}
          options={coursesOptions}
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
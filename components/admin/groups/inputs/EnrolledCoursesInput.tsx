import useGetCourses from "../../../../hooks/courses/useGetCourses";
import DualListBoxInput from "../../../common/inputs/DualListBoxInput"

const EnrolledCoursesInput = ({control}) => {

  const { courses } = useGetCourses();
  
  const coursesOptions = courses?.map(course => {
    return { value: course.id, label: course.title }
  })

  return (
    <>
      { courses && (
        <DualListBoxInput
          label="Enrolled courses"
          control={control}
          name="enrolledCourseIds"
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

export default EnrolledCoursesInput
import useGetCourses from "../../../hooks/courses/useGetCourses";
import DualListBoxInput from "../../common/inputs/DualListBoxInput"

const AvailableCoursesInput = ({control}) => {

  const { courses } = useGetCourses();
  // Get array of {value: label:} objects from fetched courses object 
  const coursesOptions = courses?.edges?.map(({node: course}) => {
    return { value: course.id, label: course.title }
  })

  return (
    <>
      { courses && (
        <DualListBoxInput
          label="Available courses"
          control={control}
          name="availableCourseIds"
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

export default AvailableCoursesInput
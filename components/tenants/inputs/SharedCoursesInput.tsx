import useGetCourses from "../../../hooks/courses/useGetCourses";
import DualListBoxInput from "../../common/inputs/DualListBoxInput"

const SharedCoursesInput = ({control}) => {

  const { courses } = useGetCourses();
  
  const coursesOptions = courses?.edges?.map(({node: course}) => {
    return { value: course.id, label: course.title }
  })

  return (
    <>
      { courses && (
        <DualListBoxInput
          label="Shared courses"
          control={control}
          name="sharedCourseIds"
          options={coursesOptions}
          lang={{
            availableHeader: 'Available',
            selectedHeader: 'Shared',
          }}
        />
      )}
    </>
  )
}

export default SharedCoursesInput
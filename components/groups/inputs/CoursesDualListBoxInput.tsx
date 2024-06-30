import useGetCourses from "../../../hooks/courses/useGetCourses";
import DualListBoxInput from "../../common/inputs/DualListBoxInput"

const CoursesDualListBoxInput = ({control, name='courseIds', label='Courses'}) => {

  const { courses } = useGetCourses();
  
  const coursesOptions = courses?.edges?.map(({node: course}) => {
    return { value: course.id, label: course.title }
  })

  return (
    <>
      { courses && (
        <DualListBoxInput
          label={label}
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

export default CoursesDualListBoxInput
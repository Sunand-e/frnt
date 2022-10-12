import useCreateCourse from "../../hooks/courses/useCreateCourse";
import useGetCourses from "../../hooks/courses/useGetCourses";
import Button from "../common/Button";
import newCourses from "../../elp-courses";
import useDeleteCourse from "../../hooks/courses/useDeleteCourse";

const ImportElpCourses = () => {

  const { createCourse } = useCreateCourse();
  const { deleteCourse } = useDeleteCourse();
  const { courses } = useGetCourses();

  const importElpCourses = () => {
    newCourses.forEach(createCourse)    
  }

  const deleteAllCourses = () => {
    courses?.forEach(course => deleteCourse(course.id))
  }

  return (
    <>
    { courses && 'loaded' }
      <Button onClick={importElpCourses}>Import</Button>
      <Button onClick={deleteAllCourses}>DELETE ALL COURSES</Button>
    </>
  )
}

export default ImportElpCourses
import { useRouter } from '../../utils/router'
import useGetLesson from "../../hooks/lessons/useGetLesson"
import LessonView from "./LessonView"

const CourseItemView = ({id}) => {

  const { lesson, loading, error } = useGetLesson(id)
  // useEffect(() => {
  //   headerButtonsVar(
  //     <>
  //       <Button onClick={() => router.push(`/admin/courses/edit?id=${cid}`)}>Cancel</Button>
  //       <Button>Preview lesson</Button>
  //       <Button>Publish</Button>
  //     </>
  //   )
  // },[])

  return (
    <>
      { lesson && (
        <>
          <LessonView id={id} />
        </>
      )}
    </>
  )
}
export default CourseItemView
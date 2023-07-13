import { useQuery } from "@apollo/client"
import { useRouter } from '../../../utils/router'
import { GET_LESSON } from "../../../graphql/queries/allQueries"
import EditorLayout from "../../../layouts/EditorLayout"
import ModuleEditor from "../../../components/courses/ModuleEditor"
import usePageTitle from "../../../hooks/usePageTitle"

const AdminLesson = () => {
  const router = useRouter()

  const { id, cid } = router.query
  
  const { loading, error, data: {lesson} = {} } = useQuery(
    GET_LESSON,
    {
      variables: {
        id
      }
    }
  );

  usePageTitle({ title: `Lesson: ${lesson?.title}` })

  return (
    <>
      { lesson &&
        <>
          { lesson && <ModuleEditor id={id} /> }
        </>
      }
    </>
  )
}
AdminLesson.navState = {
  topLevel: 'courses',
  secondary: 'courses'
}

AdminLesson.getLayout = page => (
  <EditorLayout
    navState={AdminLesson.navState || {}}
    page={page}
  />
)
export default AdminLesson
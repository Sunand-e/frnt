import PageTitle from "../../../components/PageTitle"
import { useEffect } from "react"
import { headerButtonsVar, viewVar } from "../../../graphql/cache"
import { useQuery } from "@apollo/client"
import { useRouter } from '../../../utils/router'
import { GET_LESSON } from "../../../graphql/queries/allQueries"
import Button from "../../../components/Button"

import EditorLayout from "../../../layouts/EditorLayout"
import LessonEditor from "../../../components/admin/courses/LessonEditor"

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

  // useEffect(() => {
  //   const view = {
  //     isSlimNav: true,
  //     showSecondary: false,
  //     ...viewVar()
  //   }
  //   viewVar(view)
  //   return () => {
  //     const view = viewVar()
  //     delete view.isSlimNav
  //     delete view.showSecondary
  //     viewVar(view)
  //   }
  // },[])

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
      { lesson &&
        <>
          <PageTitle title={`Edit Lesson: ${lesson?.title}`} />
          { lesson && <LessonEditor id={id} /> }
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
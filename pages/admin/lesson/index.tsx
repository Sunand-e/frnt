import PageTitle from "../../../components/PageTitle"
import ContentEditor from "../../../components/ContentEditor/ContentEditor"
import { useEffect } from "react"
import cache, { headerButtonsVar, viewVar } from "../../../graphql/cache"
import { useMutation, useQuery } from "@apollo/client"
import { useRouter } from '../../../utils/router'
import { ContentFragment, GET_COURSE, GET_LESSON } from "../../../graphql/queries/allQueries"
import Button from "../../../components/Button"

import EditorLayout from "../../../components/layouts/EditorLayout"
import { ContentContextProvider } from "../../../context/contentContext"
import LessonEditor from "../../../components/admin/courses/LessonEditor"

const AdminLesson = () => {
  const router = useRouter()

  const { id, courseId } = router.query
  
  const { loading, error, data: {lesson} = {} } = useQuery(
    GET_LESSON,
    {
      variables: {
        id
      }
    }
  );


  useEffect(() => {
    const view = {
      isSlimNav: true,
      showSecondary: false,
      ...viewVar()
    }
    viewVar(view)
    return () => {
      const view = viewVar()
      delete view.isSlimNav
      delete view.showSecondary
      viewVar(view)
    }
  },[])

  useEffect(() => {
    headerButtonsVar(
      <>
        <Button onClick={() => router.push(`/admin/courses/edit?id=${courseId}`)}>Cancel</Button>
        <Button>Preview lesson</Button>
        <Button>Publish</Button>
      </>
    )
  },[])

  return (
    <>
      { lesson &&
        <>
          <PageTitle title={`Edit Lesson: ${lesson?.title}`} />
          { lesson && <LessonEditor lesson={lesson} /> }
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
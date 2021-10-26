import PageTitle from "../../components/PageTitle"
import ContentEditor from "../../components/ContentEditor/ContentEditor"
import { useRouter } from "next/router"
import { useEffect } from "react"
import cache, { headerButtonsVar, viewVar } from "../../graphql/cache"
import { useMutation, useQuery } from "@apollo/client"
import { ContentFragment, GET_COURSE, GET_LESSON } from "../../graphql/queries/allQueries"
import Button from "../../components/Button"
import { UPDATE_LESSON } from "../../graphql/mutations/lesson/UPDATE_LESSON"
import { UpdateLesson, UpdateLessonVariables } from "../../graphql/mutations/lesson/__generated__/UpdateLesson"
import { ContentFragment as ContentFragmentType } from '../../graphql/queries/__generated__/ContentFragment';
import EditorLayout from "../../components/layouts/EditorLayout"

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

  const content = lesson && "blocks" in lesson.content ? lesson.content.blocks : []

  const [updateLesson, updatedLesson] = useMutation<UpdateLesson, UpdateLessonVariables>(
    UPDATE_LESSON
  );
  
  const handleChange = (contentBlocks) => {
    
    const cachedLesson = cache.readFragment<ContentFragmentType>({
      id:`ContentItem:${id}`,
      fragment: ContentFragment,
    })

    updateLesson({
      variables: {
        id,
        content: { blocks: contentBlocks }
      },
      optimisticResponse: {
        updateLesson: {
          __typename: 'UpdateLessonPayload',
          lesson: {
            ...cachedLesson,
            content: {
              blocks: contentBlocks 
            }
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

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
          <ContentEditor content={lesson.content} onChange={handleChange} />
          <pre>
            { JSON.stringify(lesson.content,null, 2) }
          </pre>
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
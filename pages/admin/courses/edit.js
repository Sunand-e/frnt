import usePageTitle from '../../../hooks/usePageTitle'
import CourseEditForm from '../../../components/admin/courses/CourseEditForm'
import CourseItemEditor from '../../../components/admin/courses/CourseItemEditor'
import { useRouter } from '../../../utils/router'
import { useQuery } from '@apollo/client'
import { GET_COURSE, GET_LESSON } from "../../../graphql/queries/allQueries"
import EditorLayout from '../../../layouts/EditorLayout'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import { useState, useEffect } from 'react'
import Button from '../../../components/Button'
import useCourse from '../../../hooks/useCourse'

const AdminCoursesEdit = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { id, cid: contentId } = router.query

  const [courseItemId, setCourseItemId] = useState(contentId)

  const { loading, error, data: {course} = {} } = useQuery(
    GET_COURSE,
    {
      variables: {
        id
      }
    }
  );

  if(contentId) {
    const { 
      loading: lessonLoading, 
      error: lessonError, 
      data: {lesson} = {}
    } = useQuery(
      GET_LESSON,
      {
        variables: {
          id: contentId
        }
      }
    );
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
    // If there is a course but no item provided, show the first 
    if(course && !courseItemId) {
      setCourseItemId(course.sections?.length ? 
        (course.sections[0].children?.length ?
          course.sections[0].children[0].id :
          null
        ) :
        null
      )
    }
  },[course])

  const { saveCourseTitle } = useCourse(id)

  usePageTitle({ 
    title: "Course: ", 
    editable:  course?.title, 
    onEdit: saveCourseTitle
  })

  useEffect(() => {
    headerButtonsVar(
      <>
        <Button onClick={() => router.push('/admin/courses')}>Cancel</Button>
        <Button>Preview course</Button>
        <Button>Publish</Button>
      </>
    )
  },[])


  return (
    <>
      {/* <pre>
        COURSE:
        {JSON.stringify(course,null,2)}
      </pre> */}
      
      {/* <CourseEditForm course={course} /> */}
      { courseItemId && (
        <>
          <CourseItemEditor id={courseItemId} />
        </>
      )}
      {/* <CourseStructureEditor course={course} /> */}
    </>
  )
}

AdminCoursesEdit.navState = {
  topLevel: 'courses',
  secondary: 'courses'
}

AdminCoursesEdit.getLayout = page => (
  <EditorLayout
    navState={AdminCoursesEdit.navState || {}}
    page={page}
  />
)

export default AdminCoursesEdit
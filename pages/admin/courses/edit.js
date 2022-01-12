import PageTitle from '../../../components/PageTitle';
import CourseEditForm from '../../../components/admin/courses/CourseEditForm'
import CourseItemEditor from '../../../components/admin/courses/CourseItemEditor'
import { useRouter } from '../../../utils/router'
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_COURSE } from '../../../graphql/queries/allQueries';
import { GET_LESSON } from "../../../graphql/queries/allQueries"
import EditorLayout from '../../../layouts/EditorLayout'
import { headerButtonsVar, viewVar } from '../../../graphql/cache';
import { useState, useEffect } from 'react';
import Button from '../../../components/Button';

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

  useEffect(() => {
    headerButtonsVar(
      <>
        <Button onClick={() => router.push('/admin/courses')}>Cancel</Button>
        <Button>Preview course</Button>
        <Button>Publish</Button>
      </>
    )
  },[])

  if(course) {
    return (
      <>
        {/* <pre>
          COURSE:
          {JSON.stringify(course,null,2)}
        </pre> */}
        <PageTitle title={`Edit Course: ${course?.title}`} />
        <CourseEditForm course={course} />
        { courseItemId && (
          <>
          { courseItemId }
            <CourseItemEditor id={courseItemId} />
          </>
        )}
        {/* <CourseStructureEditor course={course} /> */}
      </>
    )
  } else {
    return (
      <PageTitle title={`Edit Course`} />
    )
  }
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
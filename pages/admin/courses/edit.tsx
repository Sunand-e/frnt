import usePageTitle from '../../../hooks/usePageTitle'
import CourseEditor from '../../../components/courses/CourseEditor'
import { useRouter } from '../../../utils/router'
import EditorLayout from '../../../layouts/EditorLayout'
import { viewVar } from '../../../graphql/cache'
import { useEffect } from 'react'
import {Gear} from '@styled-icons/fa-solid/Gear'
import useCourse from '../../../hooks/courses/useCourse'
import CourseForm from '../../../components/courses/CourseForm'
import { useSaveContentButton } from '../../../components/common/ContentEditor/useSaveContentButton'
import useGetUserCourse from '../../../hooks/users/useGetUserCourse'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { Dot } from '../../../components/common/misc/Dot';
import { closeModal, handleModal } from '../../../stores/modalStore'

const AdminCoursesEdit = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { id } = router.query
  const { courseEdge } = useGetUserCourse(id)
  const course = courseEdge?.node

  const { updateCourse } = useCourse(id)
  

  useEffect(() => {
    const view = {
      isSlimNav: true,
      showSecondary: false,
      ...viewVar()
    }
    viewVar(view)
    return () => {
      const view = viewVar()
      // delete view.isSlimNav
      delete view.showSecondary
      const newView = { ...view, isSlimNav: true }
      viewVar(newView)
    }
  },[])

  const onSettingsSubmit = ({content, ...values}) => {
    updateCourse({
      content: { description: content }, 
      ...values
    })
    closeModal()
  }

  const openCourseSettings = () => {
    handleModal({
      title: `Course settings`,
      size: 'lg',
      content: <CourseForm course={course} isModal={true} onSubmit={onSettingsSubmit} submitButtonText="Save settings" />
    })
  }

  usePageTitle({ 
    title: `Course${course?.title ? ': ' : ''}`, 
    editable:  course?.title || '', 
    onEdit: title => updateCourse({title}),
    after: (
      <div className='p-2 ml-2 cursor-pointer' onClick={openCourseSettings}>
        <Gear size="18"  />
      </div>
    )
  })

  useSaveContentButton()
  
  return (
    <>
      { course ?
        <CourseEditor /> :
        <LoadingSpinner text={(
          <>
            Loading your course
            <Dot>.</Dot>
            <Dot>.</Dot>
            <Dot>.</Dot>
          </>
        )} />
      }
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
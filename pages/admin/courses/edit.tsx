import usePageTitle from '../../../hooks/usePageTitle'
import CourseEditor from '../../../components/admin/courses/CourseEditor'
import { useRouter } from '../../../utils/router'
import EditorLayout from '../../../layouts/EditorLayout'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import { useContext, useEffect } from 'react'
import Button from '../../../components/Button'
import {Cog} from '@styled-icons/fa-solid/Cog'
import useCourse from '../../../hooks/courses/useCourse'
import { ModalContext } from '../../../context/modalContext'
import CourseForm from '../../../components/admin/courses/CourseForm'
import {ArrowBack} from "@styled-icons/boxicons-regular/ArrowBack";


const BackButton = () => (
  <>
    <span className='hidden lg:block'>Back to user list</span>
    <span className='block lg:hidden'><ArrowBack  width="20" /></span>
  </>
)

const AdminCoursesEdit = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
    
  const { id, cid } = router.query
  const { course, updateCourse } = useCourse(id)
  
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
  
  const { handleModal, closeModal } = useContext(ModalContext)

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

  // const { updateCourseTitle } = useCourse(id)

  usePageTitle({ 
    title: `Course${course?.title ? ': ' : ''}`, 
    editable:  course?.title || '', 
    onEdit: title => updateCourse({title}),
    after: (
      <div className='p-2 ml-2 cursor-pointer' onClick={openCourseSettings}>
        <Cog size="18"  />
      </div>
    )
  })

  useEffect(() => {
    headerButtonsVar(
      <>
        <Button onClick={() => router.push('/admin/courses')}>Back</Button>
        <Button onClick={() => router.push({
          pathname: `/course`,
          query: {
            id,
            cid,
            showEdit: true
          }
        })}>
          Preview
        </Button>
        <Button>Publish</Button>
      </>
    )
  },[id, cid])

  return (
    <>
      { course && 
        <CourseEditor />
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
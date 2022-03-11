import usePageTitle from '../../../hooks/usePageTitle'
import CourseItemEditor from '../../../components/admin/courses/CourseItemEditor'
import { useRouter } from '../../../utils/router'
import EditorLayout from '../../../layouts/EditorLayout'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import { useState, useEffect, useContext } from 'react'
import Button from '../../../components/Button'
import useCourse from '../../../hooks/courses/useCourse'
import { ModalContext } from '../../../context/modalContext'
import ImageLibraryModal from '../../../components/ContentEditor/blocks/ImageBlock/ImageLibraryModal'
import SelectNewCourseItem from '../../../components/admin/courses/SelectNewCourseItem'

const AdminCoursesEdit = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
    
  const { id, cid: contentId } = router.query
  
  const { course, updateCourse } = useCourse(id)

  const [courseItemId, setCourseItemId] = useState(contentId)

  const { handleModal } = useContext(ModalContext)

  useEffect(() => {
    setCourseItemId(router.query.cid)
  },[router.query.cid])

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
      const newView = { ...view }
      viewVar(newView)
    }
  },[])
  
  useEffect(() => {
    // If there is a course but no item provided, show the first 
    if(course && !courseItemId) {
      const firstItemInCourse = course?.sections.find(
        (section) => section.children?.length
      )?.children[0]
      
      if(firstItemInCourse?.id) {
        setCourseItemId(firstItemInCourse.id)
      }
    }
  },[course])

  // const { updateCourseTitle } = useCourse(id)

  usePageTitle({ 
    title: "Course: ", 
    editable:  course?.title, 
    onEdit: title => updateCourse({title})
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
      { course && (courseItemId ? (
        <CourseItemEditor id={courseItemId} />
        ) : (
          <div className='mx-auto my-0 space-y-4 h-full self-center flex flex-col justify-center items-center w-full max-w-sm'>
            <SelectNewCourseItem sectionId={course.sections[0]?.id} placeholder="Create your first course item" />
        </div>
      ))}
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
import usePageTitle from '../../../hooks/usePageTitle'
import CourseEditForm from '../../../components/admin/courses/CourseEditForm'
import CourseItemEditor from '../../../components/admin/courses/CourseItemEditor'
import { useRouter } from '../../../utils/router'
import { useQuery } from '@apollo/client'
import { GET_COURSE, GET_LESSON } from "../../../graphql/queries/allQueries"
import EditorLayout from '../../../layouts/EditorLayout'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import { useState, useEffect, useContext } from 'react'
import Button from '../../../components/Button'
import useCourse from '../../../hooks/courses/useCourse'
import AddItemToCourseForm from '../../../components/admin/courses/AddItemToCourseForm'
import ImageSelect from '../../../components/ContentEditor/ImageSelect'
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

  // const { loading, error, data: {course} = {} } = useQuery(
  //   GET_COURSE,
  //   {
  //     variables: {
  //       id
  //     }
  //   }
  // );

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
    if(course) {
      const firstItemInCourse = course?.sections.find(
        (section) => section.children?.length
      )?.children[0]
  
      if(firstItemInCourse) {
        setCourseItemId(firstItemInCourse.id)
      } else {
        
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
  

  // updateCourse({image: true})


  const selectImageModal = () => {
    handleModal({
      title: `Choose image`,
      content: <ImageLibraryModal onImageSelect={(image) => updateCourse({imageId: image.id})} />,
      // content: <ImageLibraryModal onImageSelect={(image) => alert(image.id)} />,
      // content: <ImageLibraryModal onImageSelect={(img) => alert(JSON.stringify(img,null,2))} />,
      size: 'lg'
    })
  }

  return (
    <>
      { course && (courseItemId ? (
        <CourseItemEditor id={courseItemId} />
        ) : (
          <div className='mx-auto my-0 space-y-4 h-full self-center flex flex-col justify-center items-center w-full max-w-sm'>
            {/* <ImageSelect 
              src={course.image?.location}
              onClick={selectImageModal}
              buttonText="Choose course image"
              isButtonAlwaysVisible={true}
            /> */}
            {/* <AddItemToCourseForm sectionId={course.sections[0]?.id} /> */}
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
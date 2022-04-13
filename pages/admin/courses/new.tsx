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
import InputWithLabel from '../../../components/common/inputs/InputWithLabel'

const AdminCoursesNew = () => {
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
    title: "New course"
  })

  useEffect(() => {
    headerButtonsVar(
      <>
        <Button onClick={() => router.push('/admin/courses')}>Course Builder</Button>
      </>
    )
  },[])

  const selectImageModal = () => {
    handleModal({
      title: `Choose image`,
      content: <ImageLibraryModal onImageSelect={(image) => updateCourse({imageId: image.id})} />,
      size: 'lg'
    })
  }

  return (
    <div className='h-full w-full max-w-sm'>
      <InputWithLabel
        onChange={(e) => false} 
        label="Course name"
        value={''}
        name="videoUrl"
        placeholder="Untitled course"
      />
      <ImageSelect 
        src={course?.image?.location}
        onClick={selectImageModal}
        buttonText="Choose course image"
        isButtonAlwaysVisible={true}
      />
      <p className='mt-4'>More settings...</p>
      <p className='text-lg font-bold mt-4'>Create your first course item:</p>
      <AddItemToCourseForm sectionId={course?.sections[0]?.id} />
    </div>
  )
}

AdminCoursesNew.navState = {
  topLevel: 'courses',
  // secondary: 'courses'
}

export default AdminCoursesNew
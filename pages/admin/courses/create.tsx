import usePageTitle from '../../../hooks/usePageTitle'
import { useRouter } from '../../../utils/router'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import { useState, useEffect, useContext } from 'react'
import Button from '../../../components/Button'
import { v4 as uuidv4 } from 'uuid';
import { CreateCourse, CreateCourseVariables } from '../../../graphql/mutations/course/__generated__/CreateCourse';
import { GetCourses } from '../../../graphql/queries/__generated__/GetCourses';
import { ModalContext } from '../../../context/modalContext'
import { useMutation } from '@apollo/client'
import { CREATE_COURSE } from '../../../graphql/mutations/course/CREATE_COURSE'
import { GET_COURSES } from '../../../graphql/queries/allQueries'
import LoadingSpinner from '../../../components/LoadingSpinner'
import CourseForm from '../../../components/admin/courses/CourseForm'

const AdminCourseSetup = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()

  const { handleModal, closeModal } = useContext(ModalContext);

  usePageTitle({ 
    title: "Set up a new course"
  })

  useEffect(() => {
    headerButtonsVar(
      <Button onClick={() => router.push('/admin/courses')}>Back to Courses</Button>
    )
  },[])

  const [createCourse, newCourse] = useMutation<CreateCourse, CreateCourseVariables>(
    CREATE_COURSE,
    {
      // the update function updates the list of courses returned from the cached query.
      // This runs twice - once after the optimistic response, and again after the server response.
      update(cache, { data: { createCourse } } ) {

        const cachedData = cache.readQuery<GetCourses>({
          query: GET_COURSES
        })

        cache.writeQuery({
          query: GET_COURSES,
          data: {
            ...cachedData,
            courses: {
              ...cachedData?.courses,
              edges: [{node: createCourse.course}, ...(cachedData?.courses.edges || [])]
            }
          }
        })

        if(createCourse.course.id.indexOf('tmp-') !== 0) {          
          closeModal()
          router.push({
            pathname: `/admin/courses/edit`,
            query: {
              id: createCourse.course.id
            }
          })
        }
      },
    }
  );

  const onSubmit = (values) => {
    
    const { title, imageId, content, tags, ...settings } = values
    // setSubmitted(values);

    createCourse({
      variables: { 
        title,
        imageId,
        settings,
        tags,
        content: {
          description: content
        },
        sections: [{
          title: "Section 1"
        }]
      },
      optimisticResponse: {
        createCourse: {
          __typename: 'CreateCoursePayload',
          course: {
            __typename: 'ContentItem',
            id: `tmp-${Math.floor(Math.random() * 10000)}`,
            title: values.title,
            createdAt: '',
            updatedAt: '',
            content: {},
            contentType: null,
            itemType: 'course',
            image: null,
            icon: null,
            prerequisites: null,
            tags: [],
            sections: [{
              __typename: 'ContentItem',
              itemType: 'section',
              id: uuidv4(),
              title: 'Section 1',
              createdAt: '',
              updatedAt: '',
              content: {},
              contentType: null,
              image: null,
              icon: null,
              prerequisites: null,
              _deleted: false,
              children: [],
              users: null,
              settings: {},
              tags: [],
            }],
            users: null,
            settings: {},
            _deleted: false,
          },
          message: ''
        }
      }
      // refetchQueries: [{ query: GET_COURSE }]
    }).catch(res => {
      // TODO: do something if there is an error!!
    })

    handleModal({
      content: <LoadingSpinner />
    })
  }

  return (
    // <div className='h-full w-full max-w-screen-lg mx-auto'>
    <>
      <CourseForm submitButtonText='Course Builder' onSubmit={onSubmit}/>
    </>
  )
}

AdminCourseSetup.navState = {
  topLevel: 'courses',
  // secondary: 'courses'
}

export default AdminCourseSetup
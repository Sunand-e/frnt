import usePageTitle from '../../../hooks/usePageTitle'
import { useRouter } from '../../../utils/router'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import { useState, useEffect, useContext } from 'react'
import Button from '../../../components/Button'
import { v4 as uuidv4 } from 'uuid';
import useCourse from '../../../hooks/courses/useCourse'
import { CreateCourse, CreateCourseVariables } from '../../../graphql/mutations/course/__generated__/CreateCourse';
import { GetCourses } from '../../../graphql/queries/__generated__/GetCourses';
import { ModalContext } from '../../../context/modalContext'
import TextInput from '../../../components/common/inputs/TextInput'
import { useForm } from 'react-hook-form'
import CheckboxInput from '../../../components/common/inputs/CheckboxInput'
import SelectInput from '../../../components/common/inputs/SelectInput'
import ImageSelectInput from '../../../components/common/inputs/ImageSelectInput'
import { useMutation } from '@apollo/client'
import { CREATE_COURSE } from '../../../graphql/mutations/course/CREATE_COURSE'
import { GET_COURSES } from '../../../graphql/queries/allQueries'
import LoadingSpinner from '../../../components/LoadingSpinner'

const AdminCourseSetup = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()

  const { handleModal, closeModal } = useContext(ModalContext);

  usePageTitle({ 
    title: "New course"
  })

  useEffect(() => {
    headerButtonsVar(
      <Button onClick={() => router.push('/admin/courses')}>Back to Pathways</Button>
    )
  },[])

  const [createCourse, newCourse] = useMutation<CreateCourse, CreateCourseVariables>(
    CREATE_COURSE,
    {
      // the update function updates the list of courses returned from the cached query.
      // This runs twice - once after the optimistic response, and again after the server response.
      update(cache, { data: { createCourse } } ) {

        const data = cache.readQuery<GetCourses>({
          query: GET_COURSES
        })
        
        cache.writeQuery({
          query: GET_COURSES,
          data: { 
            courses: data ? [createCourse.course, ...data.courses] : [createCourse.course]
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
    
    const { title, imageId, ...settings } = values
    // setSubmitted(values);

    createCourse({
      variables: { 
        title,
        imageId,
        settings,
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
              settings: {},
            }],
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

  interface CourseSetupFormValues {
    title: string
    imageId: string
    accessType: string
    coursePrice: string
    enablePrerequisites: boolean
    disableProgression: boolean
  }

  const { register, handleSubmit, control } = useForm<CourseSetupFormValues>();

  return (
    // <div className='h-full w-full max-w-lg mx-auto'>
    <>
      <form
        className='h-full w-full max-w-sm flex flex-col space-y-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          label="Course name"
          placeholder="Untitled course"
          inputAttrs={register("title", { /*maxLength: 20*/ })}
        />
        <ImageSelectInput
          placeholder={'https://picsum.photos/640/360'}
          buttonText="Choose course image"
          control={control}
          name="imageId"
          // inputAttrs={register("image", { required: true })}
        />
        <SelectInput
          label="Course access type"
          options={["Open access", "Assignable", "Paid access"]}
          inputAttrs={register("accessType")}
        />
        <TextInput
          label="Course price"
          placeholder="Untitled course"
          inputAttrs={register("coursePrice")}
        />
        <CheckboxInput
          label="Enable prerequisites"
          inputAttrs={register("enablePrerequisites")}
        />
        <CheckboxInput
          label="Disable lesson progression"
          inputAttrs={register("disableProgression")}
        />
        <Button type="submit">Course Builder</Button>
        {/* <p className='text-lg font-bold mt-4'>Create your first course item:</p>
        <AddItemToCourseForm sectionId={123} /> */}
      </form>
      </>
  )
}

AdminCourseSetup.navState = {
  topLevel: 'courses',
  // secondary: 'courses'
}

export default AdminCourseSetup
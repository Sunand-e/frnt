import { useMutation, useReactiveVar } from '@apollo/client';
import { Form, Formik, useField } from "formik"
import React, { useContext } from 'react';
import { CREATE_COURSE } from "../../../graphql/mutations/course/CREATE_COURSE";
import { CreateCourse, CreateCourseVariables } from '../../../graphql/mutations/__generated__/CreateCourse';
import { GetCourses } from '../../../graphql/queries/__generated__/GetCourses';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { noticesVar } from '../../../graphql/cache';
import { GET_COURSES } from '../../../graphql/queries/allQueries';
import { CreateSection, CreateSectionVariables } from '../../../graphql/mutations/section/__generated__/CreateSection';
import { CREATE_SECTION } from '../../../graphql/mutations/section/CREATE_SECTION';
import { ModalContext } from '../../../context/modalContext';
import LoadingSpinner from '../../LoadingSpinner';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}
const CourseCreateModalForm = () => {

  const router = useRouter()
  const notices = useReactiveVar(noticesVar)
  const editLink = '/admin/courses'

  
  const { handleModal, closeModal } = useContext(ModalContext);
  
  const anotherHandle = () => {
    handleModal({
      content: <LoadingSpinner />
    })
    closeModal()
  }
  
  const [createSection, newSection] = useMutation<CreateSection, CreateSectionVariables>(
    CREATE_SECTION,
    {
      onCompleted({createSection}) {
        const {id: courseId} = newCourse.data.createCourse.course
        router.push(`/admin/courses/edit?id=${courseId}`)
      }
    }
  );

  const [createCourse, newCourse] = useMutation<CreateCourse, CreateCourseVariables>(
    CREATE_COURSE,
    {
      // the update function updates the cache 
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
      },

      // When we get the real course ID from the server, create a section for the course
      onCompleted({createCourse}) {
        
        const {id} = createCourse.course

        // router.push(backLink)
        createSection({
          variables: { 
            title: 'Section 1', 
            content: {},
            parentIds: [id]
          },
          // the optimistic response is stored in the cache immediately, 
          // and updated when the actual response is received
          optimisticResponse: {
            createSection: {
              __typename: 'CreateSectionPayload',
              section: {
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
                children: []
              },
              message: ''
            }
          }
          // refetchQueries: [{ query: GET_COURSE }]
        }).catch(res => {
          console.log('ERROR')
          console.log(res)
          // TODO: do something if there is an error!!
        })
      }
    }
  );


  return (
    <Formik
      initialValues={{
        title: ''
      }}
      onSubmit={values => {
        createCourse({
          variables: { title: values.title },
          optimisticResponse: {
            createCourse: {
              __typename: 'CreateCoursePayload',
              course: {
                __typename: 'ContentItem',
                id: Math.floor(Math.random() * 10000) + '',
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
                _deleted: false,
              },
              message: ''
            }
          }
          // refetchQueries: [{ query: GET_COURSE }]
        }).catch(res => {
          // TODO: do something if there is an error!!
        })
        noticesVar([
          {
            content: `The course '${values.title}' has been created`,
            id: uuidv4()
          },
          ...notices
        ])

        anotherHandle()


      }}
      // validationSchema={Yup.object({
      //   title: Yup.string()
      //     .max(15, 'Must be 15 characters or less')
      //     .required('Required')
      // })}
    >
      
      {formik => (
        <Form>
          <TextInput
            name='title'
            label="Course name"
            placeholder='Untitled course'
          />
          <button type="submit" className={'mt-4 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm'}>
            {`Create course`}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default CourseCreateModalForm
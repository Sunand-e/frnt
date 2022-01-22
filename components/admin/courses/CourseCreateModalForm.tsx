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
import { queryEditor } from '@udecode/plate-core';

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
const CourseCreateModal = () => {

  const router = useRouter()

  const notices = useReactiveVar(noticesVar)

  const { handleModal, closeModal } = useContext(ModalContext);

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
            pathname: `${router.pathname}/edit`,
            query: {
              id: createCourse.course.id
            }
          })
        }
      },
    }
  );

  return (
    <Formik
      initialValues={{
        title: ''
      }}
      onSubmit={values => {
        createCourse({
          variables: { 
            title: values.title,
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
                }],
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

        noticesVar([
          {
            content: `The course '${values.title}' has been created`,
            id: uuidv4()
          },
          ...notices
        ])
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

export default CourseCreateModal
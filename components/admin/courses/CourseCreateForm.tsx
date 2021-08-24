import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import React from 'react';
import { CREATE_COURSE } from '../../../graphql/mutations/allMutations';
import TextInput from '../../TextInput';
import Button from '../../Button';
import { CreateCourse } from '../../../graphql/mutations/__generated__/CreateCourse';
// import { GET_COURSE } from '../../../graphql/queries/allQueries';
import { GetCourses, GetCourses_courses } from '../../../graphql/queries/__generated__/GetCourses';
import CreateForm from '../forms/CreateForm';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { noticesVar } from '../../../graphql/cache';
import { GET_COURSE } from '../../../graphql/queries/allQueries';
import CourseEditor from './CourseEditor';

const CourseCreateForm = () => {

  const router = useRouter()
  const notices = useReactiveVar(noticesVar)
  const backLink = '/admin/courses'

  const [createCourse, newCourse] = useMutation<CreateCourse, CreateCourse>(
    CREATE_COURSE,
    {
      update(cache, { data: { createCourse } } ) {
        // alert(JSON.stringify(createCourse))
        const data = cache.readQuery<GetCourses>({
          query: GET_COURSE
        })
        cache.writeQuery({
          query: GET_COURSE,
          data: { 
            courses: [createCourse.course, ...data.courses]
          }
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
                __typename: 'Course',
                id: Math.floor(Math.random() * 10000) + '',
                title: values.title,
                createdAt: '',
                updatedAt: '',
                _deleted: false,
              }

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
        router.push(backLink)
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required')
      })}
    >
      
      {formik => (
        <CreateForm 
          formik={formik}
          backLink={'/admin/users/courses'}
          entityName={'course'}
        >
          <TextInput
            label="Course title"
            name="title"
            type="text"
          />
        <CourseEditor />
        </CreateForm>
      )}
    </Formik>
  );
}

export default CourseCreateForm
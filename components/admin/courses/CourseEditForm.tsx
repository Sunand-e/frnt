import { useMutation, useReactiveVar } from '@apollo/client';
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import React from 'react';
import { UPDATE_COURSE } from "../../../graphql/mutations/course/UPDATE_COURSE";
import { UpdateCourse, UpdateCourseVariables } from '../../../graphql/mutations/__generated__/UpdateCourse';
import TextInput from '../../TextInput';
import Button from '../../Button';
import Link from 'next/link';
import ButtonLink from '../../ButtonLink';
import EditForm from '../forms/EditForm';
import { useRouter } from 'next/router';
import { noticesVar } from '../../../graphql/cache';
import { v4 as uuidv4 } from 'uuid';
import TextInputInlineLabel from '../../TextInputInlineLabel';

const CourseEditForm = ({course}) => {
  
  const [editCourse, updatedCourse] = useMutation<UpdateCourse, UpdateCourseVariables>(
    UPDATE_COURSE
    );
    
    const router = useRouter()

    const backLink = '/admin/courses'

    const notices = useReactiveVar(noticesVar)

    return (
    <Formik
      initialValues={course}
      // initialValues={{
      //   id: course.id,
      //   name: course.name
      // }}
      onSubmit={values => {
        editCourse({
          variables: { id: course.id, title: values.title },
          optimisticResponse: {
            updateCourse: {
              __typename: 'UpdateCoursePayload',
              course: {
                __typename: 'ContentItem',
                id: course.id,
                title: values.title,
                _deleted: false,
                createdAt: '',
                updatedAt: '',
              }
            }
          }
        }).catch(res => {
          // TODO: do something if there is an error!!
        })
        noticesVar([
          {
            content: `Course '${values.name}' has been updated`,
            id: uuidv4()
          },
          ...notices
        ])
        router.push(backLink)
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required')
      })}
    >
      {formik => (
        <Form>
          <TextInputInlineLabel
            label="Course name"
            name="title"
            type="text"
            placeholder="Untitled course"
          />
        </Form>
      )}
    </Formik>
  );
}

export default CourseEditForm
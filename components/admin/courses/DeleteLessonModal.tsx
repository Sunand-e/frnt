import { useMutation, useReactiveVar } from '@apollo/client';
import { Form, Formik, useField } from "formik"
import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { noticesVar } from '../../../graphql/cache';
import { LessonFragment, SectionFragment } from "../../../graphql/queries/allQueries";
import { ModalContext } from '../../../context/modalContext';
import LoadingSpinner from '../../LoadingSpinner';
import { DeleteLesson, DeleteLessonVariables } from '../../../graphql/mutations/lesson/__generated__/DeleteLesson';
import { DELETE_LESSON } from '../../../graphql/mutations/lesson/DELETE_LESSON';
import { GetSection, GetSection_section } from '../../../graphql/queries/__generated__/GetSection';
import Button from '../../Button';

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
const DeleteLessonModal = ({lessonId}) => {

  return (
    <>
    <p>Are you sure you want to delete this lesson?</p>
    <Button onClick={() => handleDeleteLesson(lessonId)}>Delete lesson</Button>
    </>
  );
}

export default DeleteLessonModal
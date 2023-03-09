import { useMutation } from '@apollo/client';
import { Form, Formik, useField } from "formik"
import React, { useContext } from 'react';
import { CourseFragment } from "../../graphql/queries/allQueries";
import LoadingSpinner from '../common/LoadingSpinner';
import { CreateSection, CreateSectionVariables } from '../../graphql/mutations/section/__generated__/CreateSection';
import { CREATE_SECTION } from '../../graphql/mutations/section/CREATE_SECTION';
import { GetCourse_course } from '../../graphql/queries/__generated__/GetCourse';
import { closeModal, handleModal } from '../../stores/modalStore';
import useCreateSection from '../../hooks/sections/useCreateSection';

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
const AddSectionModal = ({courseId}) => {

  const anotherHandle = () => {
    handleModal({
      content: <LoadingSpinner />
    })
    closeModal()
  }
  
  const { createSection } = useCreateSection({courseId})

  const handleNewSection = (values) => {
    createSection({
      title: values.title,
      parentIds: [courseId]
    })
    anotherHandle()
  }

  return (
    <Formik
      initialValues={{
        title: ''
      }}
      onSubmit={values => handleNewSection(values)}
    >
      
      {formik => (
        <Form>
          <TextInput
            name='title'
            label=""
            placeholder='Untitled section'
          />
          <button type="submit" className={'mt-4 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm'}>
            {`Create new section`}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default AddSectionModal

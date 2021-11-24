import { useMutation, useReactiveVar } from '@apollo/client';
import { Form, Formik, useField } from "formik"
import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { noticesVar } from '../../../graphql/cache';
import { CourseFragment, GET_COURSE, SectionFragment } from "../../../graphql/queries/allQueries";
import { ModalContext } from '../../../context/modalContext';
import LoadingSpinner from '../../LoadingSpinner';
import { CreateLesson, CreateLessonVariables } from '../../../graphql/mutations/lesson/__generated__/CreateLesson';
import { CREATE_LESSON } from '../../../graphql/mutations/lesson/CREATE_LESSON';
import { GetSection, GetSection_section } from '../../../graphql/queries/__generated__/GetSection';

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
const AddLessonModal = ({sectionId}) => {

  const { handleModal, closeModal } = useContext(ModalContext);
  
  const anotherHandle = () => {
    handleModal({
      content: <LoadingSpinner />
    })
    closeModal()
  }
  
  const [createLesson, newLesson] = useMutation<CreateLesson, CreateLessonVariables>(
    CREATE_LESSON,
    {
      update(cache, { data: { createLesson } } ) {
        const sectionData = cache.readFragment<GetSection>({
          id:`ContentItem:${sectionId}`,
          fragment: SectionFragment,
          fragmentName: 'SectionFragment'
        })

        const newSectionData = {
          ...sectionData,
          children: [...sectionData.children, createLesson.lesson]
        }

        cache.writeFragment<GetSection_section>({
          id:`ContentItem:${sectionId}`,
          fragment: SectionFragment,
          fragmentName: 'SectionFragment',
          data: newSectionData
        })
      },
 
    }
  );

  const handleNewLesson = (values) => {
    createLesson({
      variables: {
        title: values.title,
        parentIds: [sectionId]        
      },
      // optimisticResponse: {
      //   createLesson: {
      //     __typename: 'CreateLessonPayload',
      //     lesson: {
      //       __typename: 'ContentItem',
      //       id: Math.floor(Math.random() * 10000) + '',
      //       title: values.title,
      //       createdAt: '',
      //       updatedAt: '',
      //       content: {},
      //       contentType: null,
      //       itemType: 'lesson',
      //       image: null,
      //       icon: null,
      //       prerequisites: null,
      //       _deleted: false,
      //     },
      //     message: ''
      //   }
      // }
      // refetchQueries: [{ query: GET_COURSE }]
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
    anotherHandle()
  }

  return (
    <Formik
      initialValues={{
        title: ''
      }}
      onSubmit={values => handleNewLesson(values)}
    >
      
      {formik => (
        <Form>
          <TextInput
            name='title'
            label=""
            placeholder='Untitled lesson'
          />
          <button type="submit" className={'mt-4 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm'}>
            {`Create new lesson`}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default AddLessonModal
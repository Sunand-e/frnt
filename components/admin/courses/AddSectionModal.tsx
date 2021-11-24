import { useMutation, useReactiveVar } from '@apollo/client';
import { Form, Formik, useField } from "formik"
import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { noticesVar } from '../../../graphql/cache';
import { GET_COURSE, CourseFragment } from "../../../graphql/queries/allQueries";
import { ModalContext } from '../../../context/modalContext';
import LoadingSpinner from '../../LoadingSpinner';
import { CreateSection, CreateSectionVariables } from '../../../graphql/mutations/section/__generated__/CreateSection';
import { CREATE_SECTION } from '../../../graphql/mutations/section/CREATE_SECTION';
import { GetCourse, GetCourse_course } from '../../../graphql/queries/__generated__/GetCourse';

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
      update(cache, { data: { createSection } } ) {
        console.log('run theipdatefunction')
        const courseData = cache.readFragment<GetCourse_course>({
          id:`ContentItem:${courseId}`,
          fragment: CourseFragment,
          fragmentName: 'CourseFragment'
        })
        
        console.log('courseData')
        console.log(courseData)
        const newCourseData = {
          ...courseData,
          sections: [...courseData.sections, createSection.section]
        }
        
        console.log('run writethenewcoursedata')
        console.log(newCourseData)
        cache.writeFragment<GetCourse_course>({
          id:`ContentItem:${courseId}`,
          fragment: CourseFragment,
          fragmentName: 'CourseFragment',
          data: newCourseData
        })
      },
 
    }
  );

  const handleNewSection = (values) => {
    createSection({
      variables: {
        title: values.title,
        parentIds: [courseId]        
      },
      // optimisticResponse: {
      //   createSection: {
      //     __typename: 'CreateSectionPayload',
      //     section: {
      //       __typename: 'ContentItem',
      //       id: Math.floor(Math.random() * 10000) + '',
      //       title: values.title,
      //       createdAt: '',
      //       updatedAt: '',
      //       content: {},
      //       contentType: null,
      //       itemType: 'section',
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
      onSubmit={values => handleNewSection(values)}
    >
      
      {formik => (
        <Form>
          <TextInput
            name='title'
            label=""
            placeholder='Untitled section'
          />
          <button type="submit" className={'mt-4 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm'}>
            {`Create new section`}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default AddSectionModal
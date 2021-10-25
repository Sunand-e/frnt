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
const DeleteLessonModalForm = ({lessonId}) => {

  const { handleModal, closeModal } = useContext(ModalContext);
  
  const [deleteLesson, deleteLessonResponse] = useMutation<DeleteLesson, DeleteLessonVariables>(
    DELETE_LESSON,
    {
      update(cache, { data: { deleteLesson } } ) {

        
        // We get a single item.
        const lesson = cache.readFragment({
          id: `ContentItem:${lessonId}`,
          fragment: LessonFragment,
          fragmentName: 'LessonFragment',
          // optimistic: true,
        });
        // Then, we update it.
        if (lesson) {
          cache.writeFragment({
            id: `ContentItem:${lessonId}`,
            fragment: LessonFragment,
            fragmentName: 'LessonFragment',
            data: {
              ...lesson,
              _deleted: true
            },
          });
        }
        // const data = cache.readFragment<GetSection>({
        //   id:`ContentItem:${sectionId}`,
        //   fragment: SectionFragment,
        //   fragmentName: 'SectionFragment'
        // })

        // cache.writeFragment<GetSection_section>({
        //   id:`ContentItem:${sectionId}`,
        //   fragment: SectionFragment,
        //   fragmentName: 'SectionFragment',
        //   data: {
        //     ...data,
        //     children: data.children.filter(child => child.id !== lessonId)
        //   }
        // })
      },
    }
  );

  const handleDeleteLesson = (value) => {
    deleteLesson({
      variables: {
        id: value
      },
      
      optimisticResponse: {
        deleteLesson: {
          __typename: 'DeleteLessonPayload',
          lesson: {
            __typename: 'ContentItem',
            id: Math.floor(Math.random() * 10000) + '',
            title: '',
            deletedAt: '',
            updatedAt: '',
            content: {},
            contentType: null,
            itemType: 'lesson',
            image: null,
            icon: null,
            prerequisites: null,
            _deleted: false,
          },
          message: ''
        }
      }
      // refetchQueries: [{ query: GET_COURSE }]
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
    closeModal()
  }

  return (
    <>
    <p>Are you sure you want to delete this lesson?</p>
    <Button onClick={() => handleDeleteLesson(lessonId)}>Delete lesson</Button>
    </>
  );
}

export default DeleteLessonModalForm
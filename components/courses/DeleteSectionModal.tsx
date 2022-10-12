import { useMutation, useReactiveVar } from '@apollo/client';
import { Form, Formik, useField } from "formik"
import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { noticesVar } from '../../graphql/cache';
import { SectionFragment } from "../../graphql/queries/allQueries";
import { ModalContext } from '../../context/modalContext';
import LoadingSpinner from '../common/LoadingSpinner';
import { DeleteSection, DeleteSectionVariables } from '../../graphql/mutations/section/__generated__/DeleteSection';
import { DELETE_SECTION } from '../../graphql/mutations/section/DELETE_SECTION';
import Button from '../common/Button';

const DeleteSectionModal = ({sectionId}) => {

  const { handleModal, closeModal } = useContext(ModalContext);
  
  const [deleteSection, deleteSectionResponse] = useMutation<DeleteSection, DeleteSectionVariables>(
    DELETE_SECTION,
    {
      update(cache, { data: { deleteSection } } ) {

        
        // We get a single item.
        const section = cache.readFragment({
          id: `ContentItem:${sectionId}`,
          fragment: SectionFragment,
          fragmentName: 'SectionFragment',
          // optimistic: true,
        });
        // Then, we update it.
        if (section) {
          cache.writeFragment({
            id: `ContentItem:${sectionId}`,
            fragment: SectionFragment,
            fragmentName: 'SectionFragment',
            data: {
              ...section,
              _deleted: true
            },
          });
        }
      },
    }
  );

  const handleDeleteSection = (value) => {
    deleteSection({
      variables: {
        id: value
      },
      
      optimisticResponse: {
        deleteSection: {
          __typename: 'DeleteSectionPayload',
          section: {
            __typename: 'ContentItem',
            id: Math.floor(Math.random() * 10000) + '',
            title: '',
            deletedAt: '',
            updatedAt: '',
            content: {},
            contentType: null,
            itemType: 'section',
            image: null,
            icon: null,
            prerequisites: null,
            _deleted: false,
          },
          message: ''
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
    closeModal()
  }

  return (
    <>
    <p>Are you sure you want to delete this section?</p>
    <Button onClick={() => handleDeleteSection(sectionId)}>Delete section</Button>
    </>
  );
}

export default DeleteSectionModal
import { gql, useMutation, useReactiveVar } from '@apollo/client';
import React, { useContext } from 'react';
import { SectionFragment } from "../../graphql/queries/allQueries";
import { DeleteSection, DeleteSectionVariables } from '../../graphql/mutations/section/__generated__/DeleteSection';
import { DELETE_SECTION } from '../../graphql/mutations/section/DELETE_SECTION';
import Button from '../common/Button';
import { closeModal, handleModal } from '../../stores/modalStore';

const DeleteSectionModal = ({id}) => {
  
  const [deleteSection, deleteSectionResponse] = useMutation<DeleteSection, DeleteSectionVariables>(
    DELETE_SECTION,
    {
      update(cache, { data: { deleteSection } } ) {

        cache.updateFragment({
          id: `ContentItem:${id}`,
          fragment: gql`
            fragment DeletedContentFragment on ContentItem {
              _deleted @client
            }
          `
        }, (data) => ({ _deleted: true }))
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
            _deleted: true,
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
    <Button onClick={() => handleDeleteSection(id)}>Delete section</Button>
    </>
  );
}

export default DeleteSectionModal
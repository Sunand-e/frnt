import { useMutation, useReactiveVar } from '@apollo/client';
import { Form, Formik, useField } from "formik"
import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { noticesVar } from '../../../graphql/cache';
import { SectionFragment } from "../../../graphql/queries/allQueries";
import { ModalContext } from '../../../context/modalContext';
import LoadingSpinner from '../../LoadingSpinner';
import { DeleteSection, DeleteSectionVariables } from '../../../graphql/mutations/section/__generated__/DeleteSection';
import { DELETE_SECTION } from '../../../graphql/mutations/section/DELETE_SECTION';
import Button from '../../Button';

const DeleteContentBlockModal = ({block, onDelete: handleDeleteBlock}) => {

  const { closeModal } = useContext(ModalContext);

  const deleteBlockAndCloseModal = (e) => {
    handleDeleteBlock()
    closeModal()
  }

  return (
    <>
      <p>Are you sure you want to delete this {block.type}?</p>
      <Button onClick={deleteBlockAndCloseModal}>{`Delete ${block.type}`}</Button>
    </>
  );
}

export default DeleteContentBlockModal
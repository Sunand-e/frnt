import React, { useContext } from 'react';
import { ModalContext } from '../../context/modalContext';
import LoadingSpinner from '../LoadingSpinner';
import Button from '../Button';
import { client } from '../../graphql/client';
import { gql } from '@apollo/client';
import FileUploader from './FileUploader';

const UploadModal = () => {

  return (
    <>
      <FileUploader />
    </>
  );
}

export default UploadModal
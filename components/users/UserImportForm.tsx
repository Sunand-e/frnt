import Link from 'next/link';
import { useRouter } from 'next/router';
import FileUploader from '../common/FileUploader';
import { GET_USERS } from '../../graphql/queries/users';
import useGetUsers from '../../hooks/users/useGetUsers';
import { useContext } from 'react';
import { ModalContext } from '../../context/modalContext';
import UserImportAccordion from './UserImportAccordion';

const UserImportForm = () => {

  const users = useGetUsers();

  const { handleModal } = useContext(ModalContext)
  
  const handleAllUploadsComplete = (data) => {
    handleModal({
      title: 'CSV upload successful',
      content: (
        <>
          <UserImportAccordion data={data?.[0]?.data} />
        </>
      )
    })
    // router.push('/admin/users')
  }

  const fileUploaderProps = {
    accept: [
      '.csv', 
      'text/csv', 
      'application/vnd.ms-excel',
      'application/csv',
      'text/x-csv',
      'application/x-csv',
      'text/comma-separated-values',
      'text/x-comma-separated-values'
    ],
    dropZoneContent: 'Upload a CSV',
    endpoint: "/api/v1/users/bulk_import",
    refetchQuery: 'GetUsers',
    fileParameterName: 'csv_file',
    onAllUploadsComplete: handleAllUploadsComplete,
    additionalParams: {
      // invite: 'true'
    } 
  }

  return <>
    <FileUploader {...fileUploaderProps} />
    <p>
      <Link href="/docs/import_user_example.csv">
        
          Download an example CSV
        
      </Link>
    </p>
  </>;
}

export default UserImportForm
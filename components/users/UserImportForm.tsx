import Link from 'next/link';
import { useRouter } from 'next/router';
import FileUploader from '../common/FileUploader';
import { GET_USERS } from '../../graphql/queries/users';
import useGetUsers from '../../hooks/users/useGetUsers';
import { useContext } from 'react';
import UserImportAccordion from './UserImportAccordion';
import ButtonLink from '../common/ButtonLink';
import DropzoneIconAndText from '../common/inputs/DropzoneIconAndText';
import { handleModal } from '../../stores/modalStore';

const UserImportForm = () => {

  const users = useGetUsers()
  
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

  const dropZoneContent = <DropzoneIconAndText
  fileHintText="CSV, up to 10MB"
  linkText="Upload a CSV file"
/>

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
    
    dropZoneContent,
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
      <ButtonLink href="/docs/import_user_example.csv">
        Download an example CSV
      </ButtonLink>
    </p>
  </>;
}

export default UserImportForm
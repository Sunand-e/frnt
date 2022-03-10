import Link from 'next/link';
import { useRouter } from 'next/router';
import FileUploader from '../../FileUploader';
import { GET_USERS } from '../../../graphql/queries/allQueries';
import useGetUsers from '../../../hooks/users/useGetUsers';

const UserImportForm = () => {

  const router = useRouter()

  const users = useGetUsers();
  
  const handleAllUploadsComplete = () => {
    router.push('/admin/users')
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
    dropZoneText: 'Upload a CSV',
    endpoint: "/api/v1/users/bulk_import",
    refetchQuery: GET_USERS,
    fileParameterName: 'csv_file',
    onAllUploadsComplete: handleAllUploadsComplete,
    additionalParams: {
      invite: 'true'
    } 
  }

  return (
    <>
      <FileUploader {...fileUploaderProps} />
      <p>
        <a>
          <Link href="/docs/import_user_example.csv">
            Download an example CSV
          </Link>
        </a>
      </p>
    </>
  );
}

export default UserImportForm
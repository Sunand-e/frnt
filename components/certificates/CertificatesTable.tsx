import { useMemo } from 'react';
import Table from '../common/tables/Table';
import LoadingSpinner from '../common/LoadingSpinner';
import useGetCertificates from '../../hooks/certificates/useGetCertificates';
import ButtonLink from '../common/ButtonLink';
import Button from '../common/Button';
import CertificateActionsCell from './CertificateActionsCell';

const CertificatesTable = () => {

  const { certificates, loading, error } = useGetCertificates()

  const tableData = useMemo(
    () => certificates?.map(c => ({...c, id: c.course.id})),
    [certificates]
  );

  console.log('tableData')
  console.log(tableData)

  const tableCols = useMemo(
    () => [
      {
        header: "Course Certificate",
        accessorKey: "course.title", // accessor is the "key" in the data

      },
      {
        width: 300,
        header: "Actions",
        accessorKey: "actions",
        cell: CertificateActionsCell
      }
    ],
    []
  );

  const tableProps = {
    tableData,
    tableCols,
    filters: ['global'],
    typeName: 'certificate'
  }
  
  return (
    <>
      { loading && (
        <LoadingSpinner />
      )}
      { error && (
        <p>Unable to fetch certificates.</p>
      )}
      { (!loading && !error) && (
        <Table { ...tableProps } />
      )}
    </>
  );
}

export default CertificatesTable
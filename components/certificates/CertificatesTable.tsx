import { useMemo } from 'react';
import Table from '../common/tables/Table';
import LoadingSpinner from '../common/LoadingSpinner';
import useGetCertificates from '../../hooks/certificates/useGetCertificates';
import CertificateActionsCell from './CertificateActionsCell';
import {Certificate} from '@styled-icons/fluentui-system-regular/Certificate'
import dayjs from 'dayjs';
import ItemWithImage from '../common/cells/ItemWithImage';
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const CertificatesTable = () => {

  const { certificates, loading, error } = useGetCertificates()

  const tableData = useMemo(
    () => certificates?.map(c => ({...c, id: c.course.id})),
    [certificates]
  );

  const tableCols = useMemo(
    () => [
      {
        header: "Course Certificate",
        accessorKey: "course.title", // accessor is the "key" in the data
        cell: ({cell}) => (
          <ItemWithImage
            title={cell.getValue()}
            icon = {<Certificate className='fill-main' />}
          />
        )
      },
      {
        header: "Certificate Type",
        accessorKey: "isScored",
        cell: ({ cell }) => (
          cell.getValue() ? 'Certificate of Achievement' : 'Completion Certificate'
        )
      },
      {
        header: "Awarded on",
        accessorFn: row => {
          const edge = row.courseUserContent.edges[0]
          let date
          if(row.isScored) {
            date = edge.passedAt            
          } else {
            date = edge.completedAt
          }
          return dayjs(date).format('Do MMMM YYYY [at] h:mm A')
        },
        cell: (cell) => cell.getValue() || <span>&mdash;</span>
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
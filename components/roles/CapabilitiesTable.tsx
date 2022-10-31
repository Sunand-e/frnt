import React, { useContext, useEffect, useMemo, useState } from 'react';
import Table from '../common/Table'
import LoadingSpinner from '../common/LoadingSpinner';
import { useQuery } from '@apollo/client';
import { GET_CAPABILITIES } from '../../graphql/queries/capabilities';
import Button from '../common/Button';
import CapabilityDetails from './CapabilityDetails';

const CapabilitiesTable = () => {

  const { loading, error, data } = useQuery(GET_CAPABILITIES)

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => data?.capabilities || [],
    [data]
  );

  const tableCols = useMemo(
    () => [
      {
        Header: "Course Name",
        accessor: "name", // accessor is the "key" in the data
        style: {
          width:"300px"
        },
      },
      {
        Header: "Details",
        Cell: ({ cell }) => {
          return (
            <CapabilityDetails cap={cell.row.original} />
          )
        }
      },
      {
        width: 300,
        style: {
          width:"300px"
        },
        Header: "Actions",
        id: "actions",
        Cell: ({ cell }) => {
          return (
            <div className="flex space-x-4 justify-center">
              <Button>Save changes</Button>
            </div>
          )
        }
      }
    ],
    [data]
  );

  const tableProps = {
    tableData,
    tableCols,
    selectable: true,
    enableRowSelection: true
  }

  return (
    <>
      <div className='flex items-center flex-col mb-2 sm:justify-between sm:flex-row'>
        <p>Showing {tableData.length} capabilities</p>
      </div>
      { loading && (
        <LoadingSpinner />
      )}
      { error && (
        <p>Unable to fetch capabilities.</p>
      )}
      { (!loading && !error) && (
        <Table {...tableProps} />
      )}
    </>
  );
}

export default CapabilitiesTable

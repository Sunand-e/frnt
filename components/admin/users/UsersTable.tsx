import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import Table from '../../Table';
import { GET_USERS } from '../../../graphql/queries/allQueries';
import { GetUsers } from '../../../graphql/queries/__generated__/GetUsers';

const UsersTable = () => {

  const { loading, error, data: queryData } = useQuery<GetUsers>(GET_USERS);
  
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(() => queryData?.users || [], [queryData]);

  const tableCols = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName", // accessor is the "key" in the data
      },
      {
        Header: "Last Name",
        accessor: "lastName", // accessor is the "key" in the data
      },
      {
        Header: "ID",
        accessor: "id",
      },
    ],
    []
  );

  return (
    <Table tableData={tableData} tableCols={tableCols} />
  );
}

export default UsersTable
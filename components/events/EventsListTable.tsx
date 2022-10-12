
import React, { useMemo } from 'react';
import Table from '../common/Table';
import { GET_COURSES, CourseFragment } from '../../graphql/queries/allQueries';
import Button from '../common/Button';
import ButtonLink from '../common/ButtonLink';
import dayjs from 'dayjs';
import providers from './providers';
import ItemWithImage from "../common/cells/ItemWithImage";
import { GetEvents } from '../../graphql/queries/__generated__/GetEvents';
import { GET_EVENTS } from '../../graphql/queries/events';
import { useQuery } from '@apollo/client';

const EventsListTable = () => {

  const editUrl = '/admin/courses/edit'

  const handleDeleteClick = (id) => {
  }

  const { loading, error, data: queryData } = useQuery<GetEvents>(GET_EVENTS);

  const tableData = useMemo(() => {
    return queryData?.events?.edges?.map(({node}) => node).filter(node => !node._deleted) || []
  }, [queryData]);

  console.log('tableData')
  console.log(tableData)

  const tableCols = useMemo(
    () => [
      {
        Header: "Event title",
        accessor: "title", // accessor is the "key" in the data
        Cell: ({ cell }) => {
          const cellProps = {
            title: cell.row.original.title,
            href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`,
            secondary: cell.row.original.provider
          }
          return (
            <ItemWithImage { ...cellProps } />
          )
        }
      },
      {
        Header: "Provider",
        accessor: "provider",
        Cell: ({cell})=> {
          return(<p>{cell.value}</p>)
        }
      }
      ,{
        Header: "Location",
        accessor: "location.title",
        Cell: ({cell})=> {
          return(
            <p>{cell.value}</p>
          )
        }
      },
      {
        width: 300,
        Header: "Actions",
        Cell: ({ cell }) => {
          const href = cell.row.values.id && `${editUrl}?id=${cell.row.values.id}`

          return (
            <div className="flex space-x-4">
              {/* <ButtonLink href={href}>Edit</ButtonLink> */}
              <Button
                onClick={() => handleDeleteClick(cell.row.values.id)}
              >
                Delete
              </Button>
            </div>
          )
        }
      }
    ],
    []
  );

    // const tableCols = useMemo(
    //     () => [
    //         {
    //             Header: "Event title",
    //             Cell: ({ cell }) => {
    //                 const cellProps = {
    //                     title: cell.row.original.name,
    //                     href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
    //                 }
    //                 return (
    //                     <ItemWithImage { ...cellProps } />
    //                 )
    //             }
    //         },
    //         {
    //             Header: "URL",
    //             accessor: "url",
    //             Cell: ({ cell }) => {
    //                 const domainUrl = `${location.protocol}//${cell.value}`
    //                 const port = location.port && `:${location.port}`
    //                 return (
    //                     <a href={domainUrl + port}>{cell.value}</a>
    //                 )
    //             },
    //         },
    //         {
    //             Header: "Date Created",
    //             accessor: "createdAt",
    //             Cell: ({ cell }) => {
    //                 return (
    //                     dayjs(cell.value).format('DD/MM')
    //                 )
    //             }
    //         },
    //         {
    //             Header: "Date Updated",
    //             accessor: "updatedAt",
    //             Cell: ({ cell }) => {
    //                 return (
    //                     dayjs(cell.value).format('DD/MM')
    //                 )
    //             }
    //         },
    //         {
    //             width: 300,
    //             Header: "Actions",
    //             // className: 'text-center',
    //             Cell: ({ cell }) => {
    //                 const href = cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
    //                 return (
    //                     <div className="space-x-4">
    //                         <ButtonLink href={href}>Edit</ButtonLink>
    //                         <Button
    //                             onClick={() => handleDelete(cell.row.original.id)}
    //                         >
    //                             Delete
    //                         </Button>
    //                     </div>
    //                 )
    //             }
    //         }
    //     ],
    //     []
    // );

  return (
    <>
      <Table tableData={tableData} tableCols={tableCols} />
    </>
  );
}

export default EventsListTable


import React, { useMemo } from 'react';
import Table from '../common/tables/Table';
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
        header: "Event title",
        accessorKey: "title", // accessor is the "key" in the data
        cell: ({ cell }) => {
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
        header: "Provider",
        accessorKey: "provider",
        cell: ({cell})=> {
          return(<p>{cell.getValue()}</p>)
        }
      }
      ,{
        header: "Location",
        accessorFn: row => row.location?.title,
        cell: ({cell})=> {
          return(
            <p>{cell.getValue()}</p>
          )
        }
      },
      {
        width: 300,
        header: "Actions",
        cell: ({ cell }) => {
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
    //             header: "Event title",
    //             cell: ({ cell }) => {
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
    //             header: "URL",
    //             accessorKey: "url",
    //             cell: ({ cell }) => {
    //                 const domainUrl = `${location.protocol}//${cell.getValue()}`
    //                 const port = location.port && `:${location.port}`
    //                 return (
    //                     <a href={domainUrl + port}>{cell.getValue()}</a>
    //                 )
    //             },
    //         },
    //         {
    //             header: "Date Created",
    //             accessorKey: "createdAt",
    //             cell: ({ cell }) => {
    //                 return (
    //                     dayjs(cell.getValue()).format('DD/MM')
    //                 )
    //             }
    //         },
    //         {
    //             header: "Date Updated",
    //             accessorKey: "updatedAt",
    //             cell: ({ cell }) => {
    //                 return (
    //                     dayjs(cell.getValue()).format('DD/MM')
    //                 )
    //             }
    //         },
    //         {
    //             width: 300,
    //             header: "Actions",
    //             // className: 'text-center',
    //             cell: ({ cell }) => {
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

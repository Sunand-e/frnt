
import React, { useMemo } from 'react';
import Table from '../Table';
import { GET_COURSES, CourseFragment } from '../../graphql/queries/allQueries';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
import EventTitleCell from './EventTitleCell';
import dayjs from 'dayjs';
import providers from './providers';
import ItemWithImageTableCell from "../common/cells/ItemWithImageTableCell";

const EventsListTable = () => {

  const editUrl = '/admin/courses/edit'

  const handleDeleteClick = (id) => {
  }

  const tableData = useMemo(
    () => {
      return [
        // {
        //   id: 'ev001',
        //   title: 'Diversity & Inclusion Workshop',
        //   provider: 'zoom',
        //   date: dayjs().subtract(2, 'days').format('DD/MM'),
        // },
        // {
        //   id: 'ev002',
        //   title: 'Onboarding Training',
        //   provider: 'teams',
        //   date: dayjs().format('DD/MM'),
        // },
        // {
        //   id: 'ev003',
        //   title: 'Fire Safety Lecture',
        //   provider: 'webex',
        //   date: dayjs().add(3, 'days').format('DD/MM'),
        // },
        // {
        //   id: 'ev004',
        //   title: 'Employee #036 Appraisal',
        //   provider: 'teams',
        //   date: dayjs().add(5, 'days').format('DD/MM'),
        // },
        {
          id: "629717e5-f5f6-4f95-a3d8-ab2c2166b625",
          title: "Event 1",
          type: "virtual",
          provider: "zoom",
        },
        {
          id: "329717e5-f5f6-4f95-a3d8-ab2c2166b625",
          title: "Event 2",
          type: "physical",
          location: {
            title: "Warren Bruce Court",
            latlong: [53.4675725,-2.3041324,15],
          }
        },
        {
          id: "429717e5-f5f6-4f95-a3d8-ab2c2166b625",
          title: "Event 3",
          type: "virtual",
          provider: "teams",
        },

      ]
    }, []
  );

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
            <ItemWithImageTableCell { ...cellProps } />
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
    //                     <ItemWithImageTableCell { ...cellProps } />
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

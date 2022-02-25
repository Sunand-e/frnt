
import React, { useMemo } from 'react';
import Table from '../Table';
import { GET_COURSES, CourseFragment } from '../../graphql/queries/allQueries';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
import EventTitleCell from './EventTitleCell';
import dayjs from 'dayjs';
import providers from './providers';

const EventsListTable = () => {

  const editUrl = '/admin/courses/edit'

  const handleDeleteClick = (id) => {
  }

  const tableData = useMemo(
    () => {
      return [
        {
          id: 'ev001',
          title: 'Diversity & Inclusion Workshop',
          provider: 'zoom',
          date: dayjs().subtract(2, 'days').format('DD/MM'),
        },
        {
          id: 'ev002',
          title: 'Onboarding Training',
          provider: 'teams',
          date: dayjs().format('DD/MM'),
        },
        {
          id: 'ev003',
          title: 'Fire Safety Lecture',
          provider: 'webex',
          date: dayjs().add(3, 'days').format('DD/MM'),
        },
        {
          id: 'ev004',
          title: 'Employee #036 Appraisal',
          provider: 'teams',
          date: dayjs().add(5, 'days').format('DD/MM'),
        },

      ]
    }, []
  );

   const tableCols = useMemo(
    () => [
      {
        Header: "Session",
        accessor: "title", // accessor is the "key" in the data
        Cell: EventTitleCell,
        className: 'text-red-500',
        headerqqed: 'text-green-500'
      },
      {
        Header: "Provider",
        accessor: "provider",
        Cell: ({ cell }) => {
          const provider = providers[cell.value]
          const ProviderLogo = provider.logo
          return (
            <div className='flex flex-col items-center text-main-dark'>
              <div className='w-10'>
                <ProviderLogo />
              </div>
              <span className='text-xs'>{provider.name}</span>
            </div>
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

  return (
    <>
      <Table tableData={tableData} tableCols={tableCols} />
    </>
  );
}

export default EventsListTable
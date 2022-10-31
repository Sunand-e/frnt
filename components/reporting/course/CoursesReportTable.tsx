import React, { useContext, useMemo, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Table from '../../common/Table'
import ButtonLink from '../../common/ButtonLink';
import ItemWithImage from '../../common/cells/ItemWithImage';
import TagSelect from '../../tags/inputs/TagSelect';
import LoadingSpinner from '../../common/LoadingSpinner';
import { Dot } from '../../common/misc/Dot';

const COURSES_REPORT_QUERY = gql`
  query CoursesReportQuery {
    courses {
      edges {
        userId
        node {
          id
          title
          _deleted @client
          image {
            id
            location
          }
          tags {
            id
            label
          }
          users {
            totalCount
            edges {
              score
              status
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`
const CoursesReportTable = () => {

  const { loading, error, data: { courses: courses} = {} } = useQuery(COURSES_REPORT_QUERY)

  const [ categoryId, setCategoryId ] = useState(null)

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      let data = courses?.edges?.map(({node}) => node)?.filter(item => {
        return !item._deleted
      })
      if(categoryId) {
        data = data?.filter(item => {
          return item.tags.some(tag => tag.id === categoryId)
        })
      }
      return data || []
    }, [courses, categoryId]
  );

  const tableCols = useMemo(
    () => [
      {
        Header: "Course Name",
        accessor: "title", // accessor is the "key" in the data
        Cell: ({ cell }) => {
          const cellProps = {
            image: cell.row.original.image,
            title: cell.value,
            secondary: cell.row.original.tags?.map(tag => tag.label).join(', '),
            // secondary: cell.row.original.title,
            href: cell.row.original.id && {
              query: {
                course: cell.row.original.id
              }
            }
          }
          return (
            <ItemWithImage { ...cellProps } />
          )
        }
      },
      {
        Header: "Enrolled users",
        accessor: "users.totalCount",
        Cell: ({ cell }) => {
          let userCount = cell.row.original.users?.totalCount
          return (
            <span>{userCount}</span>
          )
        }
      },
      {
        Header: "Not started",
        Cell: ({ cell }) => {
          const count = cell.row.original.users.edges.filter(contentUserEdge => (
            contentUserEdge.status === "completed"
          )).length
          return (
            <span>{count}</span>
          )
        }
      },
      {
        Header: "In progress",
        Cell: ({ cell }) => {
          const count = cell.row.original.users.edges.filter(contentUserEdge => (
            contentUserEdge.status === "completed"
          )).length
          return (
            <span>{count}</span>
          )
        }
      },
      {
        Header: "Completed",
        Cell: ({ cell }) => {
          const count = cell.row.original.users.edges.filter(contentUserEdge => (
            contentUserEdge.status === "completed"
          )).length
          return (
            <span>{count}</span>
          )
        }
      },
      {
        Header: "Avg. Test Score",
        Cell: ({ cell }) => {
          return (
            <span>-</span>
          )
        }
      },
      {
        Header: "% Complete",
        Cell: ({ cell }) => {
          const totalCount = cell.row.original.users.edges.length
          const completedCount = cell.row.original.users.edges.filter(contentUserEdge => (
            contentUserEdge.status === "completed"
          )).length
          const ratio = totalCount ? completedCount/totalCount : 0
          const percentage = `${Math.round(ratio*100)}%`

          return (
            <span>{percentage}</span>
          )
        }
      },
      // {
      //   Header: "Categories",
      //   accessor: "tags",
      //   Cell: ({ cell }) => {
      //     const tagString = cell.row.original.tags?.map(tag => tag.label).join(', ')
      //     return (
      //       <span>{tagString}</span>
      //     )
      //   }
      // },
      {
        width: 300,
        style: {
          width:"300px"
        },
        Header: "Actions",
        Cell: ({ cell }) => {
          const href = cell.row.original.id && {
            query: {
              course: cell.row.original.id
            }
          }

          return (
            <div className="flex space-x-4 justify-center">
              <ButtonLink href={href}>See reports</ButtonLink>
            </div>
          )
        }
      }
    ],
    []
  );

  const clearFilters = () => {
    setCategoryId(null)
  }

  const tableProps = {
    tableData,
    tableCols,
    selectable: true
  }

  return (
    <>
    <div className='flex items-center flex-col mb-2 sm:flex-row'>
      <TagSelect selected={categoryId} tagType={`category`} onSelect={tag => setCategoryId(tag.id)} />
      <span className={`text-main-secondary hover:text-main p-1 px-3 cursor-pointer`} onClick={clearFilters}>clear filters</span>
    </div>

      { loading && <LoadingSpinner text={(
        <>
          Loading courses
          <Dot>.</Dot>
          <Dot>.</Dot>
          <Dot>.</Dot>
        </>
      )} /> }
      { error && (
        <p>Unable to fetch course report.</p>
      )}
      { (!loading && !error) && (
        <Table {...tableProps} />
      )}
    </>
  );
}

export default CoursesReportTable

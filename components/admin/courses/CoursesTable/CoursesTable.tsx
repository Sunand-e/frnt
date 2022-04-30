import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import Table from '../../../Table';
import { GET_COURSES } from '../../../../graphql/queries/allQueries';
import { GetCourses } from '../../../../graphql/queries/__generated__/GetCourses';
import Button from '../../../Button';
import ButtonLink from '../../../ButtonLink';
import CourseTitleCell from './CourseTitleCell';
import useDeleteCourse from '../../../../hooks/courses/useDeleteCourse';
import useGetCourses from '../../../../hooks/courses/useGetCourses';
import ItemWithImageTableCell from '../../../common/cells/ItemWithImageTableCell';

const CoursesTable = () => {

  // const { loading, error, data: queryData } = useQuery<GetCourses>(GET_COURSES);
  
  // const [deleteCourse, { data: deletedData }] = useMutation<DeleteCourse>(DELETE_COURSE);
  const { loading, error, courses } = useGetCourses();
  const { deleteCourse } = useDeleteCourse();

  const editUrl = '/admin/courses/edit'

  const handleDeleteClick = (id) => {
    deleteCourse(id)
  }

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return courses?.filter(item => !item._deleted) || []
    }, [courses]
  );

  // useEffect(() => {
  //   console.log('queryData')
  //   console.log(queryData)
  //   return queryData?.courses.filter(item => !item._deleted) 
  // }, [queryData])

   const tableCols = useMemo(
    () => [
      {
        Header: "Course Name",
        accessor: "title", // accessor is the "key" in the data
        Cell: ({ cell }) => {
          const cellProps = {
            image: cell.row.original.image?.location,
            title: cell.value,
            secondary: cell.row.original.title,
            // secondary: cell.row.original.title,
            href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          }
          return (
            <ItemWithImageTableCell { ...cellProps } />
          )
        }
      },
      // {
      //   Header: "Course Name",
      //   accessor: "title", // accessor is the "key" in the data
      //   Cell: CourseTitleCell
      // },
      {
        Header: "Active users",
        accessor: "users.totalCount",
        Cell: ({ cell }) => {
          let userCount = cell.row.original.users.totalCount
          return (
            <span>{`${userCount || 0} user${userCount !== 1 ? 's' : ''}`}</span>
          )
        }
      },
      {
        Header: "Tags",
        accessor: "tags",
        Cell: ({ cell }) => {
          const tagString = cell.value.map(tag => tag.label).join(', ')
          return (
            <span>{tagString}</span>
          )
        }
      },
      {
        width: 300,
        Header: "Actions",
        accessor: "wa",
        Cell: ({ cell }) => {
          const href = cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`

          return (
            <div className="flex space-x-4">
              <ButtonLink href={href}>Edit</ButtonLink>
              <Button 
                onClick={() => handleDeleteClick(cell.row.original.id)}
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
      { loading && (
        <p>loading</p>
      )}
      { error && (
        <p>error</p>
      )}
      { (!loading && !error) && (
        <Table tableData={tableData} tableCols={tableCols} />
      )}
    </>
  );
}

export default CoursesTable
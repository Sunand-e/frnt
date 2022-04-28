import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useMemo } from 'react';
import Table from '../../../Table';
import { GET_COURSES, CourseFragment } from '../../../../graphql/queries/allQueries';
import { GetCourses } from '../../../../graphql/queries/__generated__/GetCourses';
import Button from '../../../Button';
import { DELETE_COURSE } from '../../../../graphql/mutations/course/DELETE_COURSE';
import { client } from '../../../../graphql/client';
import Link from 'next/link';
import ButtonLink from '../../../ButtonLink';
import { PencilAltIcon, PencilIcon } from '@heroicons/react/solid';
import CourseTitleCell from './CourseTitleCell';
import { DeleteCourse } from '../../../../graphql/mutations/course/__generated__/DeleteCourse';
import useDeleteCourse from '../../../../hooks/courses/useDeleteCourse';

const CoursesTable = () => {

  const { loading, error, data: queryData } = useQuery<GetCourses>(GET_COURSES);
  
  // const [deleteCourse, { data: deletedData }] = useMutation<DeleteCourse>(DELETE_COURSE);
  const { deleteCourse } = useDeleteCourse();

  const editUrl = '/admin/courses/edit'

  const handleDeleteClick = (id) => {
    deleteCourse(id)
  }

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return queryData?.courses.filter(item => !item._deleted) || []
    }, [queryData]
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
        Cell: CourseTitleCell
      },
      {
        Header: "ID",
        accessor: "id",
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
          const href = cell.row.values.id && `${editUrl}?id=${cell.row.values.id}`

          return (
            <div className="flex space-x-4">
              <ButtonLink href={href}>Edit</ButtonLink>
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
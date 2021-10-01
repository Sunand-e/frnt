import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useMemo } from 'react';
import Table from '../../Table';
import { GET_COURSES, CourseFragment } from '../../../graphql/queries/allQueries';
import { GetCourses } from '../../../graphql/queries/__generated__/GetCourses';
import Button from '../../Button';
import { DELETE_COURSE } from '../../../graphql/mutations/course/DELETE_COURSE';
import { client } from '../../../graphql/client';
import Link from 'next/link';
import ButtonLink from '../../ButtonLink';

const CoursesTable = () => {

  const { loading, error, data: queryData } = useQuery<GetCourses>(GET_COURSES);
  
  const [deleteCourse, { data: deletedData }] = useMutation<DeleteCourse>(DELETE_COURSE);

  const editUrl = '/admin/courses/edit'

  const handleDeleteClick = (id) => {
    deleteCourse({
      variables: { 
        id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteCourse: {
          __typename: 'DeleteContentItemPayload',
          contentItem: {
            id,
            _deleted: true,
          },
          message: ''
        },
      },

      update(cache, { data: deleteCourse }) {
        // We get a single item.
        const course = cache.readFragment({
          id: `ContentItem:${id}`,
          fragment: CourseFragment,
          fragmentName: 'CourseFragment',
        });
        // Then, we update it.
        if (course) {
          cache.writeFragment({
            id: `ContentItem:${id}`,
            fragment: CourseFragment,
            fragmentName: 'CourseFragment',
            data: {
              ...course,
              _deleted: true
            },
          });
        }
      }
    })
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
        Cell: ({ cell }) => {

          const href = cell.row.values.id && `/admin/courses/edit?id=${cell.row.values.id}`

          return (
            <Link href={href}>
              <a className="mt-auto text-center p-2 text-blue-dark font-semibold uppercase">{cell.value}</a>
            </Link>
          )
        }
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        width: 300,
        Header: "Actions",
        accessor: "wa",
        Cell: ({ cell }) => {
          const href = cell.row.values.id && `${editUrl}?id=${cell.row.values.id}`

          return (
            <div className="flex space-x-4">
              <Link href={href}>
                <ButtonLink>Edit</ButtonLink>
              </Link>
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
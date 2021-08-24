import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useMemo } from 'react';
import Table from '../../Table';
import { GET_COURSES, CourseFragment } from '../../../graphql/queries/allQueries';
import { GetCourses } from '../../../graphql/queries/__generated__/GetCourses';
import Button from '../../Button';
import { DELETE_COURSE } from '../../../graphql/mutations/allMutations';
import { client } from '../../../graphql/client';
import Link from 'next/link';

const CoursesTable = () => {

  const { loading, error, data: queryData } = useQuery<GetCourses>(GET_COURSES);
  
  // const [deleteCourse, { data: deletedData }] = useMutation<DeleteCourse>(DELETE_COURSE);

  const handleEditClick = (id) => {

  }

  // const handleDeleteClick = (id) => {
  //   deleteCourse({
  //     variables: { 
  //       id
  //     },
  //     optimisticResponse: {
  //       __typename: 'Mutation',
  //       deleteCourse: {
  //         __typename: 'DeleteCoursePayload',
  //         course: {
  //           id,
  //           _deleted: true,
  //         },
  //         message: ''
  //       },
  //     },

  //     update(cache, { data: deleteCourse }) {
  //       // We get a single item.
  //       const course = cache.readFragment({
  //         id: `Course:${id}`,
  //         fragment: CourseFragment,
  //       });
  //       // Then, we update it.
  //       if (course) {
  //         cache.writeFragment({
  //           id: `Course:${id}`,
  //           fragment: CourseFragment,
  //           data: {
  //             ...course,
  //             _deleted: true
  //           },
  //         });
  //       }
  //     }
  //   })
  // }

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      console.log('queryData')
      console.log(queryData)
      return queryData?.courses || []
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
          console.log('cell')
          console.log(cell)

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
        Cell: ({ cell }) => (
          // <button value={cell.row.values.name} onClick={props.handleClickCourse}>
          <div className="flex space-x-4">
            <Button 
              onClick={() => handleEditClick(cell.row.values.id)}
            >
              Edit
            </Button>
            <Button 
              // onClick={() => handleDeleteClick(cell.row.values.id)}
            >
              Delete
            </Button>
          </div>
        )
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
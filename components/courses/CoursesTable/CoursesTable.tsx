import React, { useContext, useEffect, useMemo, useState } from 'react';
import Table from '../../common/tables/Table'
import useGetCourses from '../../../hooks/courses/useGetCourses';
import ItemWithImage from '../../common/cells/ItemWithImage';
import TagSelect from '../../tags/inputs/TagSelect';
import useGetCoursesBasic from '../../../hooks/courses/useGetCoursesBasic';
import LoadingSpinner from '../../common/LoadingSpinner';
import { GraduationCap } from 'styled-icons/fa-solid';
import CourseActionsMenu from './CourseActionsMenu';

const CoursesTable = ({selectable=false, onSelectionChange=null}) => {

  // const { loading, error, courses } = useGetCourses()
  const { loading, error, courses: coursesBasic } = useGetCoursesBasic()
  const { courses: coursesFull } = useGetCourses()

  const [courses, setCourses] = useState(null);

  useEffect(() => {
    if(coursesFull) {
      setCourses(coursesFull)
    } else if(coursesBasic) {
      setCourses(coursesBasic)
    }
  }, [coursesFull,coursesBasic])
  
  const editUrl = '/admin/courses/edit'

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      return courses?.edges?.map(edge => edge.node).filter(node => {
        return !node._deleted
      }) || []
    }, [courses]
  );

  const tableCols = useMemo(
    () => [
      {
        header: "Course",
        accessorKey: "title", // accessor is the "key" in the data
        cell: ({ cell }) => (
          <ItemWithImage
            image={cell.row.original.image}
            icon={<GraduationCap className='p-1'/>}
            title={cell.getValue()}
            secondary={cell.row.original?.tags?.map?.(tag => tag.label).join(', ')}
            // secondary={cell.row.original.title}
            href={
              cell.row.original.shared === false && 
                cell.row.original.id &&
                  `${editUrl}?id=${cell.row.original.id}`
            }
          />
        )
      },
      {
        id: 'activeUsers',
        header: "Active users",
        accessorFn: row => row.users?.totalCount,
        cell: ({ cell }) => {
          let userCount = cell.row.original.users?.totalCount
          return (
            <span>{`${userCount || 0} user${userCount !== 1 ? 's' : ''}`}</span>
          )
        }
      },
      {
        id: 'category',
        header: "Category",
        accessorFn: (row) => {
          return row.tags?.filter(tag => (
            tag.tagType === 'category'
          )).map(tag => tag.label).join(', ') || '-'
        },
      },
      {
        width: 300,
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => <CourseActionsMenu course={cell.row.original} />
      }
    ],
    []
  );

  const tableProps = {
    tableData,
    tableCols,
    selectable: true,
    enableRowSelection: true,
    typeName: 'course',
    filters: ['category', 'global']
  }

  return (
    <>
      { loading && (
        <LoadingSpinner />
      )}
      { error && (
        <p>Unable to fetch courses.</p>
      )}
      { (!loading && !error) && (
        <Table {...tableProps} />
      )}
    </>
  );
}

export default CoursesTable

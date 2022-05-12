import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import Table from '../../../Table';
import { GET_COURSES } from '../../../../graphql/queries/allQueries';
import { GetCourses } from '../../../../graphql/queries/__generated__/GetCourses';
import Button from '../../../Button';
import ButtonLink from '../../../ButtonLink';
import CourseTitleCell from './CourseTitleCell';
import useDeleteCourse from '../../../../hooks/courses/useDeleteCourse';
import useGetCourses from '../../../../hooks/courses/useGetCourses';
import ItemWithImageTableCell from '../../../common/cells/ItemWithImageTableCell';
import TagSelect from '../../tags/inputs/TagSelect';
import { Tags } from 'styled-icons/fa-solid';
import DeleteCourseModal from '../DeleteCourseModal';
import { ModalContext } from '../../../../context/modalContext';
import useGetCoursesBasic from '../../../../hooks/courses/useGetCoursesBasic';

const CoursesTable = () => {

  // const { loading, error, courses } = useGetCourses()
  const { loading, error, courses: coursesBasic } = useGetCoursesBasic()
  const { courses: coursesFull } = useGetCourses()

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if(coursesFull) {
      setCourses(coursesFull)
    } else if(coursesBasic) {
      setCourses(coursesBasic)
    }
  }, [coursesFull,coursesBasic])

  const [ categoryId, setCategoryId ] = useState(null)
  const editUrl = '/admin/courses/edit'

  const { handleModal } = useContext(ModalContext)

  const handleDeleteClick = (id) => {
    handleModal({
      title: `Delete course`,
      content: <DeleteCourseModal courseId={id} />
    })
  }

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      let data = courses?.filter(item => {
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
            image: cell.row.original.image?.location,
            title: cell.value,
            secondary: cell.row.original.tags?.map(tag => tag.label).join(', '),
            // secondary: cell.row.original.title,
            href: cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`
          }
          return (
            <ItemWithImageTableCell { ...cellProps } />
          )
        }
      },
      {
        Header: "Active users",
        accessor: "users.totalCount",
        Cell: ({ cell }) => {
          let userCount = cell.row.original.users?.totalCount
          return (
            <span>{`${userCount || 0} user${userCount !== 1 ? 's' : ''}`}</span>
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
        accessor: "wa",
        Cell: ({ cell }) => {
          const href = cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`

          return (
            <div className="flex space-x-4 justify-center">
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

  const clearFilters = () => {
    setCategoryId(null)
  }
  return (
    <>
    <div className='flex items-center mb-2'>
      <TagSelect selected={categoryId} tagType={`category`} onSelect={tag => setCategoryId(tag.id)} />
      <span className={`text-main-dark hover:text-main p-1 px-3 cursor-pointer`} onClick={clearFilters}>clear filters</span>
    </div>

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
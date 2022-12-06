import React, { useContext, useEffect, useMemo, useState } from 'react';
import Table from '../../common/Table'
import Button from '../../common/Button';
import ButtonLink from '../../common/ButtonLink';
import useGetCourses from '../../../hooks/courses/useGetCourses';
import ItemWithImage from '../../common/cells/ItemWithImage';
import TagSelect from '../../tags/inputs/TagSelect';
import DeleteCourseModal from '../DeleteCourseModal';
import { ModalContext } from '../../../context/modalContext';
import useGetCoursesBasic from '../../../hooks/courses/useGetCoursesBasic';
import LoadingSpinner from '../../common/LoadingSpinner';
import { GraduationCap } from 'styled-icons/fa-solid';

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

  const [ categoryId, setCategoryId ] = useState(null)
  
  const editUrl = '/admin/courses/edit'

  const { handleModal } = useContext(ModalContext)

  const handleDeleteClick = (id) => {
    handleModal({
      title: `Delete course`,
      content: <DeleteCourseModal courseId={id} />
    })
  }

  console.log('courses')
  console.log(courses)
  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      let data = courses?.edges?.map(edge => edge.node).filter(node => {
        return !node._deleted
      })
      
      if(categoryId) {
        data = data?.filter(item => {
          return item?.tags?.some(tag => tag.id === categoryId)
        })
      }
      return data || []
    }, [courses, categoryId]
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
        style: {
          width:"300px"
        },
        header: "Actions",
        cell: ({ cell }) => {
          const href = cell.row.original.id && `${editUrl}?id=${cell.row.original.id}`

          return (
            <div className="flex space-x-4 justify-center">
              { cell.row.original.shared !== false ? (
                <Button disabled={true}>
                  Settings
                </Button>
              ) : (
                <>
                  <ButtonLink href={href}>Edit</ButtonLink>
                  <Button 
                    onClick={() => handleDeleteClick(cell.row.original.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
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
    selectable: true,
    enableRowSelection: true
  }

  return (
    <>
      <div className='flex items-center flex-col mb-2 sm:justify-between sm:flex-row'>
        <div className='flex items-center flex-col sm:flex-row'>
          <TagSelect selected={categoryId} tagType={`category`} onSelect={tag => setCategoryId(tag.id)} />
          <span className={`text-main-secondary hover:text-main p-1 px-3 cursor-pointer`} onClick={clearFilters}>clear filters</span>
        </div>
        <p>Showing {tableData.length} courses</p>
      </div>

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

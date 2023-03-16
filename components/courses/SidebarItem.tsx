import classNames from 'classnames'
import { currentContentItemVar } from "../../graphql/cache"
import {Trash} from '@styled-icons/heroicons-outline/Trash'
import styles from './SidebarItem.module.scss'
import { forwardRef, useEffect, useMemo, useState } from "react"
import { lessonTypes } from "../courses/lessonTypes"
import { gql, useFragment_experimental, useReactiveVar } from '@apollo/client'
import SidebarItemProgress from './SidebarItemProgress'
import { filterDeletedCourseItems, getItemStructureFromSections } from './CourseStructureEditor/utilities'
import { useRouter } from '../../utils/router'
import useGetUserCourse from '../../hooks/users/useGetUserCourse'

const SidebarItem = forwardRef<HTMLLIElement, any>(({
  editing=false,
  listeners,
  id,
  liClassName,
  liStyle,
  divStyle,
  divClassName,
  onSelect,
  onDelete
}, ref) => {

  const router = useRouter()
  const { id: courseId } = router.query

  const { courseEdge } = useGetUserCourse(courseId)
  const course = courseEdge?.node

  const { complete, data, missing } = useFragment_experimental({
    fragment: gql`
      fragment ContentTitleAndTypeFragment on ContentItem {
        id
        title
        contentType
      }
    `,
    from: { id, __typename: "ContentItem", },
  });

  const [title, setTitle] = useState('Untitled Lesson')
  const [contentType, setContentType] = useState('text')

  useEffect(() => {
    if(complete) {
      if(!data.title) {
        const itemStructure = getItemStructureFromSections(
          filterDeletedCourseItems(course)?.sections || []
        )
        let lessonNumber = 0
        for(let section in itemStructure) {
          if(!section.includes(id)) {
            lessonNumber += itemStructure[section].length
          } else {
            lessonNumber += itemStructure[section].indexOf(id) + 1
            break;
          }
        }
        setTitle(`Untitled Lesson`)
        // setTitle(`Lesson ${lessonNumber}`)
      } else {    
        setTitle(data.title)
      }
      data.contentType && setContentType(data.contentType)
    }
  },[data,complete])

  const currentContentItem = useReactiveVar(currentContentItemVar)

  // console.log('data')
  // console.log(data)
  // console.log('title')
  // console.log(title)
  // console.log(id)
  // console.log('contentType')
  // console.log(contentType)
  const IconComponent = contentType ? lessonTypes[contentType]?.icon : null

  const bg = (currentContentItem.id === id) ? `text-main bg-main/[.1]` : `bg-transparent`

  return (
    <li
      className={classNames(
        styles.Wrapper,
        bg,
        `flex hover:bg-main hover:bg-opacity-5 text-main-secondary`,
        liClassName
      )}
      style={liStyle}
      ref={ref}
    >
      <div
        className={`
          flex items-center w-full px-4 py-2
          ${divClassName}
        `}
        style={divStyle}
        // data-cypress="draggable-item"
        {...listeners}
        tabIndex={0}
      >
        <div className="min-w-0 flex-1 flex items-center group cursor-pointer" onClick={() => onSelect(id)}>
          {/* <Link href={`/admin/courses/edit?id=${courseId}&cid=${item.id}`}> */}
            <a className={`flex py-1 space-x-2`}>
              { IconComponent && <IconComponent className="h-5 w-5 flex-0"/> }
              <span className="min-w-0 flex-1 text-sm font-medium break-words">
                { title || 'Untitled lesson'}
              </span>
            </a>
          {/* </Link> */}
          {editing ? (
            <div className="ml-auto h-7 flex space-x-2 hidden group-hover:block">
              <Trash className={`w-4 cursor-pointer`} onClick={onDelete}/>
            </div>
          ) : <SidebarItemProgress id={id} /> }
        </div>
      </div>
    </li>
  )
})

export default SidebarItem

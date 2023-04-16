import { currentContentItemVar } from "../../graphql/cache"
import {Trash} from '@styled-icons/heroicons-outline/Trash'
import { forwardRef, useEffect, useMemo, useState } from "react"
import { lessonTypes } from "../courses/lessonTypes"
import { gql, useFragment_experimental, useReactiveVar } from '@apollo/client'
import SidebarItemProgress from './SidebarItemProgress'
import { filterDeletedCourseItems, getItemStructureFromSections } from './CourseStructureEditor/utilities'
import { useRouter } from '../../utils/router'
import useGetUserCourse from '../../hooks/users/useGetUserCourse'
import ListItem from '../common/DndList/ListItem'

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
  
  const icon = contentType ? lessonTypes[contentType]?.icon : null

  const active = currentContentItem.id === id

  const after = editing ? (
    <div className="ml-auto h-7 flex space-x-2 hidden group-hover:block">
      <Trash className={`w-4 cursor-pointer`} onClick={onDelete}/>
    </div>
  ) : <SidebarItemProgress id={id} />

  return (
    <ListItem
      onSelect={() => onSelect(id)}
      icon={icon}
      active={active}
      onDelete={onDelete}
      title={title}
      after={after}
      listeners={listeners}
      divStyle={divStyle}
      divClassName={divClassName}      
      liStyle={liStyle}
      liClassName={liClassName}
      ref={ref}
    />
  )
})

export default SidebarItem

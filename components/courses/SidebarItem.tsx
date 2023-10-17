import {Trash} from '@styled-icons/heroicons-outline/Trash'
import {Duplicate} from '@styled-icons/ionicons-solid/Duplicate'
import { forwardRef, useEffect, useMemo, useState } from "react"
import { moduleTypes } from "../courses/moduleTypes"
import { gql, useFragment_experimental } from '@apollo/client'
import SidebarItemProgress from './SidebarItemProgress'
import { filterDeletedCourseItems, getItemStructureFromSections } from './CourseStructureEditor/utilities'
import { useRouter } from '../../utils/router'
import useGetUserCourse from '../../hooks/users/useGetUserCourse'
import ListItem from '../common/DndList/ListItem'
import { ContentTitleAndTypeFragment } from '../../graphql/queries/allQueries'
import MenuComponent from '../common/menus/MenuComponent'
import {MoreVertical} from '@styled-icons/fluentui-system-filled/MoreVertical'
import ProfileWidget from '../app/header/ProfileWidget'
import SidebarItemMenu from './SidebarItemMenu'
import SidebarItemMenuTippy from './SidebarItemMenuTippy'
import SidebarItemMenuHeadlessUI from './SidebarItemMenuHeadlessUI'
const SidebarItem = forwardRef<HTMLLIElement, any>(({
  editing=false,
  listeners,
  id,
  liClassName,
  liStyle,
  divStyle,
  divClassName,
  onSelect,
  onDuplicate,
  onDelete
}, ref) => {

  const router = useRouter()
  const { id: courseId, cid: currentId } = router.query

  const { courseEdge } = useGetUserCourse(courseId)
  const course = courseEdge?.node

  const { complete, data, missing } = useFragment_experimental({
    fragment: ContentTitleAndTypeFragment,
    from: { id, __typename: "ContentItem", },
  });

  const [title, setTitle] = useState('Untitled Lesson')

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
        const label = moduleTypes[type]?.label
        setTitle(`Untitled ${label || 'module'}`)
        // setTitle(`Lesson ${lessonNumber}`)
      } else {    
        setTitle(data.title)
      }
    }
  },[data,complete])

  const type = data.contentType || data.itemType
  const icon = type ? moduleTypes[type]?.icon : null

  const active = currentId === id

  const actions = [
    ...(type === 'standard_lesson' ? [{
      label: 'Duplicate lesson',
      onClick: onDuplicate
    }] : []),
    {
      label: `Delete ${moduleTypes[type]?.lowercase}`,
      onClick: onDelete
    }
  ]


  const after = editing ? (
    <div className="ml-auto h-7 flex space-x-2 hidden group-hover:block absolute right-2" onClick={e => e.stopPropagation()}>
      <SidebarItemMenu actions={actions} />
      {/* <Duplicate className={`w-4 cursor-pointer`} onClick={(onDuplicate)}/> */}
      {/* <Trash className={`w-4 cursor-pointer`} onClick={onDelete}/> */}
    </div>
  ) : <SidebarItemProgress id={id} />

  return (
    <ListItem
      onSelect={onSelect}
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

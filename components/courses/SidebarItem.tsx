import classNames from 'classnames'
import { currentContentItemVar } from "../../graphql/cache"
import { ContentFragment } from "../../graphql/queries/allQueries"
import {Trash} from '@styled-icons/heroicons-outline/Trash'
import styles from './SidebarItem.module.scss'
import { forwardRef, useEffect, useState } from "react"
import { lessonTypes } from "../courses/lessonTypes"
import { useFragment_experimental, useReactiveVar } from '@apollo/client'
import { motion } from 'framer-motion'
import useGetUserContent from '../../hooks/users/useGetUserContent'
import { useRouter } from '../../utils/router'

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
  const { id: courseId, cid: contentId } = router.query

  const { user } = useGetUserContent(courseId);

  const { complete, data } = useFragment_experimental({
    fragment: ContentFragment,
    from: {
      __typename: "ContentItem",
      id: id,
    },
  });
  
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if(user) {
      let userContent = user.lessons.edges.find(userContentEdge => userContentEdge.node.id === id)
      // alert(userContent?.status)
      switch(userContent?.status) {
        case 'in_progress': {
          setProgress(0.5)
          break
        }
        case 'completed': {
          setProgress(1)
          break
        }
        default: {
          setProgress(0)
          break
        }
        }
    }
  },[user, id])

  const currentContentItem = useReactiveVar(currentContentItemVar)
  
  const IconComponent = data ? lessonTypes[data?.contentType]?.icon : null

  const bg = (currentContentItem.id === id) ? `text-main bg-main/[.1]` : `bg-transparent`

  const circleStyle = {
    strokeDashoffset: 0,
    strokeWidth: '15%',
    fill: 'none'
  }
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
                {!!data && data.title || 'Untitled lesson'}
              </span>
            </a>
          {/* </Link> */}
          {editing ? (
            <div className="ml-auto h-7 flex space-x-2 hidden group-hover:block">
              <Trash className={`w-4 cursor-pointer`} onClick={onDelete}/>
            </div>
          ) : (
            <div className="ml-auto h-7 flex space-x-2 ">
              <svg id="progress" width="100%" height="auto" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="30" 
                  pathLength="1"
                  className='stroke-main/10'
                  style={circleStyle}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="30"
                  pathLength="0"
                  className="stroke-main"
                  style={{ ...circleStyle, rotate: '-90deg' }}
                  transition={{ duration: 0.8 }}
                  animate={{
                    pathLength: progress
                  }}
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </li>
  )
})

export default SidebarItem

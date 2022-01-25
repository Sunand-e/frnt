import dayjs from "dayjs"
import classNames from 'classnames'

import cache, { courseNavigationVar } from "../../graphql/cache"
import { ContentFragment } from "../../graphql/queries/allQueries"

import { ContentFragment as ContentFragmentType } from '../../graphql/queries/__generated__/ContentFragment'
import { BookOpenIcon } from "@heroicons/react/outline"
import { useRouter } from '../../utils/router'
import Link from "next/link"
import Button from "../Button"
import { CSS } from '@dnd-kit/utilities'
import useModal from "../../hooks/useModal"
import DeleteLessonModal from "../admin/courses/DeleteLessonModal"
import {Trash} from '@styled-icons/heroicons-outline/Trash'

import styles from './SidebarItem.module.scss'

const SidebarItem = ({
  dragOverlay,
  dragging,
  sorting,
  index,
  fadeIn,
  listeners,
  ref,
  style,
  transform,
  transition,
  value
}) => {

  const item = cache.readFragment<ContentFragmentType>({
    id:`ContentItem:${value}`,
    fragment: ContentFragment,
  })

  const router = useRouter()
  const { id: courseId } = router.query

  const { handleModal } = useModal()

  const handleDeleteModal = (value) => {
    handleModal({
      title: `Delete lesson`,
      content: <DeleteLessonModal lessonId={value} />
    })
  }
  
  const onSelect = () => {
    router.push({
      pathname: `/admin/courses/edit`,
      query: {
        ...router.query,
        cid: item.id
      }
    })
  }

  const updatedDate = dayjs(item.updatedAt).format('MMMM D, YYYY [at] h:mm A')

  return (
    <li
      className={classNames(
        styles.Wrapper,
        `flex hover:bg-main hover:bg-opacity-10 hover:text-main-dark`,
        fadeIn && styles.fadeIn,
        sorting && styles.sorting,
        dragOverlay && styles.dragOverlay
      )}
      style={
        {
          transition,
          '--translate-x': transform
          ? `${Math.round(transform.x)}px`
          : undefined,
          '--translate-y': transform
          ? `${Math.round(transform.y)}px`
          : undefined,
          '--scale-x': transform?.scaleX
          ? `${transform.scaleX}`
          : undefined,
          '--scale-y': transform?.scaleY
          ? `${transform.scaleY}`
          : undefined,
          '--index': index,
        } as React.CSSProperties
      }
      ref={ref}
    >
      <div
        className={`
          flex items-center w-full px-4 py-2
          ${dragging && 'dragging'}
          ${dragOverlay && 'dragOverlay'}
        `}
        style={style}
        data-cypress="draggable-item"
        {...listeners}
        tabIndex={0}
      >
        {/* <div className="min-w-0 flex-1 flex items-center"> */}
        <div className="min-w-0 flex-1 flex items-center" onClick={onSelect}>
        {/* <div className="min-w-0 flex-1 flex items-center" onClick={() => router.push(`/admin/courses/edit?id=${courseId}&cid=${item.id}`)}> */}
        <Link href={`/admin/courses/edit?id=${courseId}&cid=${item.id}`}>
          <a>
          <span className="min-w-0 flex-0 text-sm font-medium text-indigo-600">{item.title}</span>
          </a>
        </Link>

          <div className="ml-auto flex space-x-2">
            <Trash className={`w-3`} onClick={() => handleDeleteModal(item.id)}/>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SidebarItem
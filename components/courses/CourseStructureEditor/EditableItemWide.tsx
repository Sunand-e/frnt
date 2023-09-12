import classNames from 'classnames'
import styles from '../SidebarItem.module.scss'
import { ContentFragment as ContentFragmentType } from '../../../graphql/queries/__generated__/ContentFragment';
import cache from "../../../graphql/cache"
import { ContentFragment } from '../../../graphql/queries/allQueries';
import { handleModal } from '../../../stores/modalStore'
import BookOpenIcon from "@heroicons/react/24/outline/BookOpenIcon"
import { useRouter } from "next/router";
import Button from "../../common/Button"

import dayjs from 'dayjs'
import useDeleteLesson from '../../../hooks/lessons/useDeleteLesson';
import useConfirmDelete from '../../../hooks/useConfirmDelete';
const EditableItemWide = ({
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
  id
}) => {
  
  const router = useRouter()

  const item = cache.readFragment<ContentFragmentType>({
    id:`ContentItem:${id}`,
    fragment: ContentFragment,
    fragmentName: 'ContentFragment',
  })
  const { deleteLesson } = useDeleteLesson(id)
  const { confirmDelete } = useConfirmDelete({
    itemType: 'lesson',
    name: item.title,
    onConfirm: deleteLesson
  }
  )
  const updatedDate = dayjs(item.updatedAt).format('MMMM D, YYYY [at] h:mm A')

  const handleSelect = () => {
    router.push({
      pathname: `/admin/courses/edit`,
      query: {
        ...router.query,
        cid: id
      }
    })
  }

  return (
    <li
      className={classNames(
        styles.Wrapper,
        `flex hover:bg-gray-50`,
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
        className={classNames(
          'flex items-center w-full px-4 py-4 sm:px-6',
          dragging && styles.dragging,
          dragOverlay && styles.dragOverlay,
        )}
        style={style}
        data-cypress="draggable-item"
        {...listeners}
        tabIndex={0}
      >
        <div className="min-w-0 flex-1 flex items-center" onClick={handleSelect}>
          <div className="shrink-0 w-8 bg-main-secondary text-white p-1 rounded-full align-top">
            <BookOpenIcon />
          </div>
          <div className="min-w-0 flex-0 px-4 md:grid md:grid-cols-2 md:gap-4 items-center">
            <span className="text-sm font-medium text-indigo-600">{item.title}</span>
            <div className="hidden md:block">
              <span className="text-sm text-gray-900">
                Last edited: <time dateTime={item.updatedAt}>{updatedDate}</time>
              </span>
            </div>
          </div>

          <div className="ml-auto flex space-x-2">
            {/* <Button onClick={() => router.push(`/admin/lesson?id=${item.id}&courseId=${course.id}`)}>Edit</Button> */}
            <Button onClick={confirmDelete}>Delete</Button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default EditableItemWide
import classNames from 'classnames'
import DeleteLessonModal from "../DeleteLessonModal"
import SidebarItem from "../SidebarItem"
import styles from '../SidebarItem.module.scss'
import { useContext } from "react"
import { useRouter } from 'next/router'
import { handleModal } from '../../../stores/modalStore'

const SidebarEditableItem = ({
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

  const handleDelete = (e) => {
    e.stopPropagation()
    handleDeleteModal(id)
  }
  
  const handleDeleteModal = (id) => {
    handleModal({
      title: `Delete lesson`,
      content: <DeleteLessonModal lessonId={id} />
    })
  }
  
  const handleSelect = () => {
    router.push({
      pathname: `/admin/courses/edit`,
      query: {
        ...router.query,
        cid: id
      }
    })
  }

  const liClassName = classNames(
    fadeIn && styles.fadeIn,
    sorting && styles.sorting,
    dragOverlay && styles.dragOverlay
  )

  const liStyle = {
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

  const divClassName = `
    ${dragging && 'dragging'}
    ${dragOverlay && 'dragOverlay'}
  `
  
  return (
    <SidebarItem
      editing={true}
      listeners={listeners}
      ref={ref}
      id={id}
      liClassName={liClassName}
      liStyle={liStyle}
      divStyle={style}
      divClassName={divClassName}
      onSelect={handleSelect}
      onDelete={handleDelete}
    />
  )
}

export default SidebarEditableItem
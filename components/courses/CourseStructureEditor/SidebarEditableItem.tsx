import classNames from 'classnames'
import DeleteLessonModal from "../DeleteLessonModal"
import SidebarItem from "../SidebarItem"
import styles from '../SidebarItem.module.scss'
import { useContext } from "react"
import { useRouter } from 'next/router'
import { closeModal, handleModal } from '../../../stores/modalStore'
import useDeleteLesson from '../../../hooks/lessons/useDeleteLesson'
import useConfirmDelete from '../../../hooks/useConfirmDelete'
import { useEditorViewStore } from '../../common/ContentEditor/useEditorViewStore'
import { useBlockStore } from '../../common/ContentEditor/useBlockStore'

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

  const { deleteLesson } = useDeleteLesson(id)
  const { confirmDelete } = useConfirmDelete({
    itemType: 'lesson',
    name: 'id',
    onConfirm: () => {
      deleteLesson()
    }
  })

  const handleDelete = (e) => {
    e.stopPropagation()
    confirmDelete()
  }
  
  const handleSelect = (id) => {
    useEditorViewStore.setState({activeSettingsPanel: 'module'})
    useBlockStore.setState({activeBlockId: null})

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
import classNames from 'classnames'
import SidebarItem from "../SidebarItem"
import styles from '../SidebarItem.module.scss'
import { useRouter } from 'next/router'
import useDeleteLesson from '../../../hooks/lessons/useDeleteLesson'
import useConfirmDelete from '../../../hooks/useConfirmDelete'
import { useEditorViewStore } from '../../common/ContentEditor/useEditorViewStore'
import { useBlockStore } from '../../common/ContentEditor/useBlockStore'
import { ContentTitleAndTypeFragment } from '../../../graphql/queries/allQueries'
import { useFragment_experimental } from '@apollo/client'
import { moduleTypes } from '../moduleTypes'

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
  const { cid: contentId } = router.query

  const { deleteLesson } = useDeleteLesson(id)
  const items = useEditorViewStore(state => state.items)

  const { complete, data, missing } = useFragment_experimental({
    fragment: ContentTitleAndTypeFragment,
    from: { id, __typename: "ContentItem", },
  });

  const moduleTypeName = data ? data.itemType === 'quiz' ? 'quiz' : data.contentType : null
  const moduleTypeString = moduleTypeName && moduleTypes[moduleTypeName].lowercase
  const { confirmDelete } = useConfirmDelete({
    // itemType: 'lesson',
    itemType: moduleTypeString,
    name: data?.title,
    onConfirm: () => {
      if(contentId === id) {
        const flatItemsArray = Object.values(items).flat()
        const prevItemIndex = flatItemsArray.indexOf(id) - 1
        const prevItemId = flatItemsArray[prevItemIndex]

        prevItemId && router.push({
          pathname: `/admin/courses/edit`,
          query: {
            ...router.query,
            cid: prevItemId
          }
        })
      }
      deleteLesson()
    }
  })

  const handleDelete = (e) => {
    e.stopPropagation()
    confirmDelete()
  }
  
  const handleSelect = (id) => {
    useEditorViewStore.setState({activeSettingsPanel: 'module'})
    // useBlockStore.setState({activeBlockId: null})

    router.push({
      pathname: `/admin/courses/edit`,
      query: {
        id: router.query.id,
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
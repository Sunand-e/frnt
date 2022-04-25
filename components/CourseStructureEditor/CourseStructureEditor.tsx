import { MultipleContainers } from "./MultipleContainers"
import { useMutation } from '@apollo/client';
import styles from '../dnd-kit/Item/Item.module.scss'
import classNames from 'classnames'
import { useContext, useEffect, useState } from "react"
import { ModalContext } from "../../context/modalContext"
import cache from "../../graphql/cache"
import { ContentFragment, SectionFragment } from "../../graphql/queries/allQueries"
import { ContentFragment as ContentFragmentType } from '../../graphql/queries/__generated__/ContentFragment';
import { SectionFragment as SectionFragmentType } from '../../graphql/queries/__generated__/SectionFragment';
import { UpdateCourse, UpdateCourseVariables } from '../../graphql/mutations/course/__generated__/UpdateCourse';
import Button from "../Button"
import DeleteLessonModal from "../admin/courses/DeleteLessonModal"
import { BookOpenIcon } from "@heroicons/react/outline"
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import dayjs from 'dayjs'
import AddSectionModal from "../admin/courses/AddSectionModal"
import DeleteSectionModal from "../admin/courses/DeleteSectionModal";
import NewSectionButton from "./NewSectionButton";
import { UPDATE_COURSE } from "../../graphql/mutations/course/UPDATE_COURSE";
import router from "next/router";
import useUpdateSection from "../../hooks/sections/useUpdateSection";


type Items = Record<string, string[]>;

const itemIdsBySectionId = (mainArray) => {
  const obj = {}

  for (const section of mainArray) {
    const sectionItemIds = section.children?.map(child => child.id)
    obj[section.id] = sectionItemIds;
  }
  return obj
}


const filterDeletedCourseItems = (course) => {
  // console.log('FILTERING')

  return {
    ...course,
    sections: course.sections.filter(section => !section._deleted).map(section => {
      // console.log('sectoiion.children')
      // console.log(section.children)
      return {
        ...section,
        children: section.children.filter(item => !item._deleted)
      }
    })
  }
}

const CourseStructureEditor = ({course, renderSection, renderItem}) => {

  
  const [courseItems, setCourseItems] = useState(
    itemIdsBySectionId(
      filterDeletedCourseItems(course).sections
    )
  )

  const [itemsBeforeDrag, setItemsBeforeDrag] = useState(courseItems);

  const [courseSections, setCourseSections] = useState(
    Object.keys(courseItems)
  )

  const [updateCourse, courseData] = useMutation<UpdateCourse, UpdateCourseVariables>(
    UPDATE_COURSE,
    {
      update(cache, { data: { updateCourse } } ) {
      },
    }
  )
const { updateSection } = useUpdateSection()
  const handleReorderSectionChildren = (newItems) => {

    console.log('REORDERING SECTION CHILDREN')
    console.log(newItems)

    for(const section in newItems) {

      const oldChildrenIds = itemsBeforeDrag[section];
      const newChildrenIds = newItems[section];
      if(
        // section !== 'newContainerId' &&
        oldChildrenIds.length === newChildrenIds.length &&
        oldChildrenIds.every((v, i) => v === newChildrenIds[i])
      ) {
        console.log(`Section children order matches`, section);
      } else {

        const cachedSection = cache.readFragment<SectionFragmentType>({
          id:`ContentItem:${section}`,
          fragment: SectionFragment,
          fragmentName: 'SectionFragment',
        })

        const newChildrenData = newChildrenIds.map(id => {
          return cache.readFragment<ContentFragmentType>({
            id:`ContentItem:${id}`,
            fragment: ContentFragment,
          })
        })

        updateSection({
          variables: {
            id: section,
            childrenIds: newChildrenIds
          },
          optimisticResponse: {
            updateSection: {
              __typename: 'UpdateSectionPayload',
              section: {
                ...cachedSection,
                children: newChildrenData
              },
            }
          }
        }).catch(res => {
          // TODO: do something if there is an error!!
        })
      }
    }

  }
  
  const handleReorderSections = (newSectionIds) => {
    const newSectionData = newSectionIds.map(id => {
      return cache.readFragment<SectionFragmentType>({
        id:`ContentItem:${id}`,
        fragment: SectionFragment,
        fragmentName: 'SectionFragment',
      })
    })
    
    updateCourse({
      variables: {
        id: course.id,
        childrenIds: newSectionIds
      },
      optimisticResponse: {
        updateCourse: {
          __typename: 'UpdateCoursePayload',
          course: {
            ...course,
            sections: newSectionData
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  const handleDragItemEnd = (items) => {
    handleReorderSectionChildren(items)
  }
  const handleDragSectionEnd = (containers) => {
    handleReorderSections(containers)
  }

  useEffect(() => {
    const newItemsObject = itemIdsBySectionId(
      filterDeletedCourseItems(course).sections
    )

    // console.log('newItemsObject')
    // console.log(newItemsObject)
    // console.log('Object.keys(newItemsObject)')
    // console.log(Object.keys(newItemsObject))
    setCourseItems(newItemsObject)
    setCourseSections(Object.keys(newItemsObject))

  },[course])

  /* Can probably get rid of the setSections and setItems declarations????*/
  // const setSections = (sections) => {
  //   console.log('courseSections')
  //   console.log('courseSections')
  //   console.log('courseSections')
  //   console.log('courseSections')
  //   console.log(courseSections)
  //   console.log(sections)
  //   if (typeof sections === 'function') {
  //     setCourseSections(sections(courseSections))
  //   } else {
  //     setCourseSections(courseSections)
  //   }
  // }

  const setItems = (items) => {
    if (typeof items === 'function') {
      setCourseItems(items(courseItems))
    } else {
      setCourseItems(courseItems)
    }
  }

  // const [items, setItems] = useState<Items>(courseItems);

  const { handleModal, closeModal } = useContext(ModalContext);

  // useEffect(() => {
  //   setItems(itemIdsBySectionId(filterDeletedCourseItems(course).sections))
  // },[course])

  const handleDelete = (value) => {
    handleModal({
      title: `Delete lesson`,
      content: <DeleteLessonModal lessonId={value} />
    })
  }

  const handleDeleteSection = (value) => {
    handleModal({
      title: `Delete section`,
      content: <DeleteSectionModal sectionId={value} />
    })
  }

  const handleAddSection = () => {
    handleModal({
      title: `Section name:`,
      content: <AddSectionModal courseId={course.id} />
    })
  }

  const defaultRenderItem = ({
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

    const updatedDate = dayjs(item.updatedAt).format('MMMM D, YYYY [at] h:mm A')
    
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
          <div className="min-w-0 flex-1 flex items-center" onClick={() => router.push(`/admin/lesson?id=${item.id}&courseId=${course.id}`)}>
            <div className="flex-shrink-0 w-8 bg-main-dark text-white p-1 rounded-full align-top">
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
              <Button onClick={() => router.push(`/admin/lesson?id=${item.id}&courseId=${course.id}`)}>Edit</Button>
              <Button onClick={() => handleDelete(item.id)}>Delete</Button>
            </div>
          </div>
        </div>
      </li>
    )
  }

  return (
    <>
      <MultipleContainers 
        vertical
        renderItem={renderItem ?? defaultRenderItem}
        items={courseItems}
        setItems={setItems}
        clonedItems={itemsBeforeDrag}
        setClonedItems={setItemsBeforeDrag}
        containers={courseSections}
        // setContainers={setSections}
        setContainers={setCourseSections}
        // onAddColumn={handleAddSectionModal}
        modifiers={[restrictToVerticalAxis]}
        onRemoveContainer={handleDeleteSection}
        onDragContainerEnd={handleDragSectionEnd}
        onDragItemEnd={handleDragItemEnd}
      />
      <NewSectionButton
        onClick={() => handleAddSection()}
      />
    </>
  )
}

export default CourseStructureEditor
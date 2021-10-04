import { MultipleContainers } from "./MultipleContainers"
import styles from './components/Item/Item.module.scss'
import classNames from 'classnames'
import { useContext, useEffect, useState } from "react"
import { ModalContext } from "../../context/modalContext"
import { hardcodedCourseData } from './hardcodedCourseData'
import cache from "../../graphql/cache"
import { ContentFragment } from "../../graphql/queries/allQueries"
import { ContentFragment as ContentFragmentType } from '../../graphql/queries/__generated__/ContentFragment';
import Button from "../Button"
import DeleteLessonModalForm from "../admin/courses/DeleteLessonModalForm"
import { BookOpenIcon } from "@heroicons/react/outline"

import dayjs from 'dayjs'
import AddSectionModalForm from "../admin/courses/AddSectionModalForm"


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
  console.log('FILTERING')
  return {
    ...course,
    sections: course.sections.filter(section => !section._deleted).map(section => {
      return {
        ...section,
        children: section.children.filter(item => !item._deleted)
      }
    })
  }
}

const CourseStructureEditor = ({course}) => {
  // const course = useState()
  const courseItems = itemIdsBySectionId(
    filterDeletedCourseItems(course).sections
  )

  console.log('courseItems',courseItems)

  const setSections = (containers) => {
    if (typeof containers === 'function') {
      console.log('setsections was passed a function')
    } else {
      console.log('setsections was passed an object')
    }
  }

  const addSection = () => {
    console.log('add section was clicked')
  }
    
  const sections = Object.keys(courseItems)
console.log('sections')
console.log(sections)
  const setItems = (items) => {
    return {}
  }
  // const [items, setItems] = useState<Items>(courseItems);

  const { handleModal, closeModal } = useContext(ModalContext);

  // useEffect(() => {
  //   setItems(itemIdsBySectionId(filterDeletedCourseItems(course).sections))
  // },[course])

  const handleDeleteModal = (value) => {
    console.log('AAAAAAAAAAAAAAAAAAAAA')
    handleModal({
      title: `Delete lesson`,
      content: <DeleteLessonModalForm lessonId={value} />
    })
  }

  const handleDeleteSectionModal = (value) => {
    console.log('AAAAAAAAAAAAAAAAAAAAA')
    handleModal({
      title: `Delete lesson`,
      content: <DeleteLessonModalForm lessonId={value} />
    })
  }

  const handleAddSectionModal = (value) => {
    console.log('AAAAAAAAAAAAAAAAAAAAA')
    handleModal({
      title: `Section name:`,
      content: <AddSectionModalForm courseId={course.id} />
    })
  }

  const renderItem = ({
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
    // return <a>dsa</a>
    return (
      <>
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
            className='flex items-center w-full px-4 py-4 sm:px-6'
            style={style}
            data-cypress="draggable-item"
            {...listeners}
            tabIndex={0}
          >
            <div className="min-w-0 flex-1 flex items-center">
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
                <Button>Edit</Button>
                <Button onClick={() => handleDeleteModal(value)}>Delete</Button>
              </div>
            </div>
          </div>
        </li>
      </>
    )
  }

  const handleSectionsChange = (containers) => {
    console.log('containers changed!!!')
    console.log('containers', containers)
  }

  const handleItemsChange = (items) => {
    console.log('items changed!!!')
    console.log('items', items)
  }

  return (
    <>
      <MultipleContainers 
        vertical
        renderItem={renderItem}
        items={courseItems}
        setItems={setItems}
        containers={sections}
        setContainers={setSections}
        onAddColumn={handleAddSectionModal}

      />
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-grey-dark text-base font-medium text-white hover:bg-grey focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm"
        // onClick={() => createCourse()}
        >
        New Section
      </button>
      {/* <pre>
        {JSON.stringify(course.sections,null,2)}
        {JSON.stringify(itemIdsBySectionId(course.sections), null, 2)}
      </pre> */}
    </>
  )
}

export default CourseStructureEditor
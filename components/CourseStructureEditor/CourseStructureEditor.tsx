import { MultipleContainers } from "./MultipleContainers"
import styles from './components/Item/Item.module.scss'
import classNames from 'classnames'
import { useContext, useEffect, useState } from "react"
import { ModalContext } from "../../context/modalContext"
import { hardcodedCourseData } from './hardcodedCourseData'
import cache from "../../graphql/cache"
import { ContentFragment } from "../../graphql/queries/allQueries"
import { ContentFragment as ContentFragmentType } from '../../graphql/queries/__generated__/ContentFragment';

type Items = Record<string, string[]>;

const itemIdsBySectionId = (mainArray) => {
  const obj = {}

  for (const section of mainArray) {
    const sectionItemIds = section.children?.map(child => child.id)
    obj[section.id] = sectionItemIds;
  }
  return obj
}

const CourseStructureEditor = ({course}) => {
  // const course = useState()  
  const courseItems = itemIdsBySectionId(course.sections)

  const [items, setItems] = useState<Items>(courseItems);
  const [containers, setContainers] = useState(Object.keys(items));

  useEffect(() => {
    if(course?.sections[0]) {
      course.sections[0].children.map(lesson => {
        const item = cache.readFragment<ContentFragmentType>({
          id:`ContentItem:${lesson.id}`,
          fragment: ContentFragment,
        })
      })
      setItems(itemIdsBySectionId(course.sections))
    }
  },[course])

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
            className='flex items-center px-4 py-4 sm:px-6'
            style={style}
            data-cypress="draggable-item"
            {...listeners}
            tabIndex={0}
          >
            <div className="min-w-0 flex-1 flex items-center">
              <div className="flex-shrink-0">
                <img className="h-12 w-12 rounded-full" src="/pic-photo.avif" alt="" />
              </div>
              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p className="text-sm font-medium text-indigo-600 truncate">{item.title}</p>
                </div>
                <div className="hidden md:block">
                  <div>
                    <p className="text-sm text-gray-900">
                      Applied on <time dateTime={Date.now().toString()}>{Date.now().toString()}</time>
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500">
                      Final block
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </>
    )
  }

  return (
    <>
      <MultipleContainers 
        vertical
        renderItem={renderItem}
        items={items}
        setItems={setItems}
        containers={containers}
        setContainers={setContainers}
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
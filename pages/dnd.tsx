import PageTitle from "../components/PageTitle"
// import CourseStructureEditor from "../components/CourseStructureEditor/CourseStructureEditor"
import { MultipleContainers } from "../components/CourseStructureEditor/MultipleContainers"
import styles from '../components/CourseStructureEditor/components/Item/Item.module.scss'

import classNames from 'classnames';

const CourseStructure = () => {

  const course = {
    children: [
      {
        id: 'trea1314r1',
        type: 'section',
        title: 'Section 1',
        children: [
          {
            id: 'terter1314r133',
            type: 'lesson',
            title: 'lesson 1'
          },
          {
            id: 'bgtfd1314r13321',
            type: 'lesson',
            title: 'lesson 2'
          }
        ]
      },
      {
        id: '1dd314r13321qw',
        type: 'section',
        title: 'Section 2',
        children: [
          {
            id: 'sss1333',
            type: 'lesson',
            title: 'lesson 3'
          },
          {
            id: 'aaa33SS',
            type: 'lesson',
            title: 'lesson 4'
          }
        ]
      },
    ]
  }

  function itemsBySectionId(mainArray) {
    const obj = {};

    for (const section of mainArray) {
      console.log(section)
         obj[section.id] = section.children;
    }
    return obj;
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
    return (
      <>
      <li
          className={classNames(
            styles.Wrapper,
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

            style={style}
            data-cypress="draggable-item"
            {...listeners}
            tabIndex={0}
          >
            {value}
          </div>
        </li>
      </>
    )
  }

  return (
    <>
      <PageTitle title="Course Structure" />
      <pre>
        {/* {JSON.stringify(itemsBySectionId(course.children), null, 2)} */}
      </pre>
      <MultipleContainers vertical renderItem={renderItem} />
      <MultipleContainers vertical  />
      {/* <MultipleContainers items={course.children} vertical /> */}

      {/* <CourseStructureEditor course={course} /> */}
    </>
  )
}

export default CourseStructure
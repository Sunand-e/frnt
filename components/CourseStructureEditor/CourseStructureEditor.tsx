
import { useState } from 'react';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Section from './Section';
// import Sidebar from '../EditorSidebar';
const CourseStructureEditor = ({ course }) => {

  // const [activeSection, setActiveSection] = useState(0)

  // const [sections, setSections] = useState(
  //   course?.children?.reduce((sectionsObj, section) => {

  //     sectionsObj[section.id] = section
  //     return sectionsObj
  //   }, {})
  // )
  
  const [children, setChildren] = useState(course?.children || [])
  
  // const [sectionOrder, setSectionOrder] = useState(
  //   course?.sections?.map(section => section.id) || []
  // )

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    if(destination === null) {
      return
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if(type === 'SECTION') {
      // Create a copy of the sectionOrder array
      const newChildren = Array.from(children)
      newChildren.splice(source.index, 1)
      newChildren.splice(
        destination.index, 0, 
        children.find(child => child.id === draggableId)
      )
      setChildren(newChildren);

      return;
    }

  }
    
  // const handleOnWheel = (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   console.log(e)
  //   return false
  // }
  console.log('children')
  console.log(children)
  return (
    <div className="w-4/5 p-2">
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId={"all-sections"} type="SECTION">
          {(provided, snapshot) => (
            <div
            className="px-12"
            >
            <div
              // className="flex"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              { children.map((child, index) => {
                // const section = children[sectionId]
                // console.log('child')
                // console.log(child)
                return (
                  <Section
                    // active={index === activeChild}
                    // setActive={setActiveChild}
                    key={child.id}
                    section={child}
                    items={child?.children || []}
                    index={index}
                  />
                )
              })}
              { provided.placeholder }
                <div
                  className="p-2 flex space-x-3 justify-center"
                  // onClick={handleNewLessonClick}
                >
                  <span>New Section</span>
                </div>
              </div>
              <div className="spacer w-12 flex-none" aria-hidden="true" />
            </div>  
          )}
        </Droppable>
        <pre>
          {/* {JSON.stringify(sectionOrder, undefined, 2)} */}
          {/* {JSON.stringify(course.courseSections.nodes, undefined, 2)} */}
        </pre>
      </DragDropContext>
    </div>
  )
}

export default CourseStructureEditor;
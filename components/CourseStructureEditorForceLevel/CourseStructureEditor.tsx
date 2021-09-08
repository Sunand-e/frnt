
import { useState } from 'react';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Section from './Section';
// import Sidebar from '../EditorSidebar';
const CourseStructureEditor = ({ course }) => {

  // const [activeSection, setActiveSection] = useState(0)
  
  const [children, setChildren] = useState(course?.children || [])

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

    
    // Dropping an item into a section
    if(type === 'ITEM') {
      const startSection = children.find(child => child.id === source.droppableId)
      const targetSection = children.find(child => child.id === destination.droppableId)

      if(startSection === targetSection) {
        console.log('startSection')
        console.log(startSection)

        const newItems = Array.from(startSection.children)
        console.log('startSection.children')
        console.log(startSection.children)
        const sourceItem = newItems.splice(source.index, 1)
        console.log('sourceItem[0]')
        console.log(sourceItem[0])
        newItems.splice(destination.index, 0, sourceItem[0])

        console.log('newItems')
        console.log(newItems)
        
        // redefine the section's item array
        const newSection = {
          ...startSection,
          children: {
            ...startSection.children,
            nodes: newItems              
          }
        }
        
        setChildren({
          ...children,
          [newSection.id]: newSection
        })
        return
      }
      
      
      // Moving from one section to another
      const startItems = Array.from(startSection.children)
      const sourceItem = startItems.splice(source.index, 1)
      const endItems = Array.from(targetSection.children)
      endItems.splice(destination.index, 0, sourceItem[0])

      const newStartSection = {
        ...startSection,
        children: {
          ...startSection.children,
          nodes: startItems              
        }
      }
      
      const newTargetSection = {
        ...targetSection,
        children: {
          ...targetSection.children,
          nodes: endItems              
        }
      }
      
      setChildren({
        ...sections,
        [newStartSection.id]: newStartSection,
        [newTargetSection.databaseId]: newTargetSection
      })
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
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                { children?.map((child, index) => {
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
          {/* {JSON.stringify(course.courseChildren.nodes, undefined, 2)} */}
        </pre>
      </DragDropContext>
    </div>
  )
}

export default CourseStructureEditor;
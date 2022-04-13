
import { useState } from '@wordpress/element';
import { Icon } from '@wordpress/components';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data'
import Section from './Section';
// import Sidebar from '../EditorSidebar';

const CourseStructure = ({course}) => {

  
  const [data, setData] = useState(course)
  
  const [sections, setSections] = useState(
    course.courseSections.nodes.reduce((sectionsObj, section) => {

      sectionsObj[section.databaseId] = section
      return sectionsObj
    }, {})
  )
  
  const [sectionOrder, setSectionOrder] = useState(
    course.courseSections.nodes.map(section => section.databaseId)
  )

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
      const newSectionOrder = Array.from(sectionOrder)
      newSectionOrder.splice(source.index, 1)
      newSectionOrder.splice(destination.index, 0, draggableId)
      
      setSectionOrder(newSectionOrder);

      return;
    }

    const startSection = data.sections[source.droppableId]
    const targetSection = data.sections[destination.droppableId]

    if(startSection === targetSection) {

      const newItemIds = Array.from(startSection.itemIds)
      newItemIds.splice(source.index, 1)
      newItemIds.splice(destination.index, 0, draggableId)
      
      // redefine the section's item array
      const newSection = {
        ...startSection,
        itemIds: newItemIds
      }
      
      setData({
        ...data,
        sections: {
          ...data.sections,
          [newSection.id]: newSection
        }
      })
      return
    }

  
    // Moving from one section to another
    const startItemIds = Array.from(startSection.itemIds)
    startItemIds.splice(source.index, 1)
    const newStartSection = {
      ...startSection,
      itemIds: startItemIds
    }

    const endItemIds = Array.from(targetSection.itemIds)
    endItemIds.splice(destination.index, 0, draggableId)
    const newTargetSection = {
      ...targetSection,
      itemIds: endItemIds
    }

    setData({
      ...data,
      sections: {
        ...data.sections,
        [newStartSection.id]: newStartSection,
        [newTargetSection.id]: newTargetSection
      }
    })
  }

  // const handleOnWheel = (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   console.log(e)
  //   return false
  // }
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId={"all-sections"} direction="horizontal" type="SECTION">
        {(provided, snapshot) => (
          <div
            className="flex w-full overflow-x-scroll mr-2"
            {...provided.droppableProps}
            ref={provided.innerRef}
            // onWheel={handleOnWheel}
          >
            { sectionOrder.map((sectionId, index) => {
              const section = data.sections[sectionId]
              const items = section.itemIds.map(itemId => data.items[itemId])

              return <Section key={section.id} section={section} items={items} index={index} />
            })}
            { provided.placeholder }
            {/* <div className="border-dashed text-center align-center mb-8 m-2 p-2 border-2 border-dashed border-grey-dark text-grey-dark w-1/4 flex-shrink-0 flex flex-col justify-center">
              +
            </div> */}
          </div>  
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default CourseStructure;
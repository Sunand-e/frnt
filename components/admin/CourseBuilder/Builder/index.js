
import { useState } from 'react';
import { Icon } from '@wordpress/components';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ScrollContainer from 'react-indiana-drag-scroll'
import Section from './Section';
import HorizontalScrollArrows from './HorizontalScrollArrows';
// import Sidebar from '../EditorSidebar';
const Builder = ({course}) => {

  const [activeSection, setActiveSection] = useState(0)

  const [sections, setSections] = useState(
    course?.sections?.reduce((sectionsObj, section) => {

      sectionsObj[section.databaseId] = section
      return sectionsObj
    }, {})
  )
  
  const [sectionOrder, setSectionOrder] = useState(
    course.sections.map(section => section.databaseId.toString())
  )
  const handleNewLessonClick= () => {
  }

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

    // Dropping an item into a section
    if(type === 'ITEM') {
      const startSection = sections[source.droppableId]
      const targetSection = sections[destination.droppableId]

      if(startSection === targetSection) {
        // console.log('startSection')
        // console.log(startSection)

        const newItems = Array.from(startSection.lessons)
        // console.log('startSection.lessons')
        // console.log(startSection.lessons)
        const sourceItem = newItems.splice(source.index, 1)
        // console.log('sourceItem[0]')
        // console.log(sourceItem[0])
        newItems.splice(destination.index, 0, sourceItem[0])

        // console.log('newItems')
        // console.log(newItems)
        
        // redefine the section's item array
        const newSection = {
          ...startSection,
          lessons: {
            ...startSection.lessons,
            nodes: newItems              
          }
        }
        
        setSections({
          ...sections,
          [newSection.databaseId]: newSection
        })
        return
      }
      
      
      // Moving from one section to another
      const startItems = Array.from(startSection.lessons)
      const sourceItem = startItems.splice(source.index, 1)
      const newStartSection = {
        ...startSection,
        lessons: {
          ...startSection.lessons,
          nodes: startItems              
        }
      }
      
      const endItems = Array.from(targetSection.lessons)
      endItems.splice(destination.index, 0, sourceItem[0])
      const newTargetSection = {
        ...targetSection,
        lessons: {
          ...targetSection.lessons,
          nodes: endItems              
        }
      }
      
      setSections({
        ...sections,
        [newStartSection.databaseId]: newStartSection,
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
  return (
    <div className="w-4/5 p-2 shadow-lg bg-white shrink">
      <ScrollContainer
        ignoreElements="*[preventdragscroll]"
        hideScrollbars={false}
        vertical={false}
        className="overflow-x-scroll"
      >   
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
                  { sectionOrder.map((sectionId, index) => {
                    const section = sections[sectionId]
                    return (
                      <Section
                        active={index === activeSection}
                        setActive={setActiveSection}
                        key={sectionId}
                        section={section}
                        items={section.lessons}
                        index={index}
                      />
                    )
                  })}
                  { provided.placeholder }
                  <div className="border-dashed text-center align-center mb-8 m-2 p-2 border-2 border-dashed border-grey-dark text-grey-dark w-60 flex-none h-80 flex flex-col justify-center">
                    <div
                    className="p-2 flex space-x-3 justify-center"
                    onClick={handleNewLessonClick}
                    >
                      <Icon icon="plus-alt" />
                      <span>New Section</span>
                    </div>
                  </div>
                  <div className="spacer w-12 flex-none" aria-hidden="true" />
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollContainer>
    </div>
  )
}

export default Builder;

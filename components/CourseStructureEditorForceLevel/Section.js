import { Draggable, Droppable } from 'react-beautiful-dnd'
import Tippy from '@tippyjs/react';
import { Icon } from '@wordpress/components';
import DraggableItem from './DraggableItem'
const ItemListClassName = `
  item-list shadow-lg bg-main-semitransparent
`

const Section = ({section, items, index, className = ''}) => {

const handleBoxToggle = () => {
  alert('aa')
}

  return (
    <Draggable
     draggableId={section.id}
     index={index}
    >
      {(provided, snapshot) => (
        <div 
          {...provided.draggableProps}
          ref={provided.innerRef}
          // className={`section ${active && 'active'} border bg-main-semitransparent overflow-hidden flex flex-col w-60 flex-shrink-0`}
          className={`section border bg-main-semitransparent overflow-hidden flex flex-col w-60 flex-shrink-0`}
          // style={{minWidth:260}}
        >
          <h3 
            {...provided.dragHandleProps}
            className="text-grey-dark font-bold p-2 px-4"
            // onClick={() => active ? setActive(null) : setActive(index)}
            // onMouseOver={handleBoxToggle}
          >
            {section.title}
          </h3>
          {
            <Droppable
              droppableId={section.id}
            >
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  className="bg-red"
                  ref={provided.innerRef}
                >
                {section?.children?.map((child, index) => {
                  console.log('child')
                  console.log(child)
                    return (
                    <DraggableItem
                      key={index}
                      item={child}
                      index={index}
                    />
                  )})}
                  {provided.placeholder}
                  <div 
                    className="cursor-pointer mb-2 p-2 border-2 border-dashed border-grey-dark text-grey-dark flex space-x-3 justify-center"
                    // onClick={handleNewLessonClick}
                  >
                    <Icon icon="plus-alt" />
                    <span>New Lesson</span>
                  </div>
                </div>
              )}
            </Droppable>
           }
        </div>
      )}
    </Draggable>
  )
}

export default Section
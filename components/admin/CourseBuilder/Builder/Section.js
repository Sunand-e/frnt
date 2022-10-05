import { Draggable, Droppable } from 'react-beautiful-dnd'
import Item from './Item'
import Tippy from '@tippyjs/react';
import { Icon } from '@wordpress/components';

const ItemListClassName = `
  item-list shadow-lg bg-main-semitransparent
`

const Section = ({section, items, index, className, active, setActive}) => {

  const handleNewLessonClick = () => {
    
  }
  const handleBoxToggle = () => {
  }

  return (
    <Draggable
     draggableId={section.databaseId.toString()}
     index={index}
    >
      {(provided, snapshot) => (
        <div 
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={`section ${active && 'active'} border bg-main-semitransparent overflow-hidden flex flex-col w-60 shrink-0`}
          // style={{minWidth:260}}
        >
          <h3 
            {...provided.dragHandleProps}
            className="text-grey-dark font-bold p-2 px-4"
            preventDragScroll="1"
            onClick={() => active ? setActive(null) : setActive(index)}
            // onMouseOver={handleBoxToggle}
          >
            {section.title}
          </h3>
          <Droppable
            droppableId={section.databaseId.toString()}
            type="ITEM"
          >
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                className={ItemListClassName}
                ref={provided.innerRef}
                preventDragScroll="1"
              >
                {items.map((item, index) => {
                  return (
                  <Item
                    key={item.databaseId}
                    item={item}
                    index={index}
                  />
                )})}
                {provided.placeholder}
                <div 
                  className="cursor-pointer mb-2 p-2 border-2 border-dashed border-grey-dark text-grey-dark flex space-x-3 justify-center"
                  onClick="handleNewLessonClick"
                >
                  <Icon icon="plus-alt" />
                  <span>New Lesson</span>
                </div>
                {/* <pre>
                {JSON.stringify(section.lessons.nodes.map(lesson => lesson.id), undefined, 2)}
                </pre> */}
              </div>
            )}
          </Droppable>
        </div>
      )}

    </Draggable>
  )
}

export default Section

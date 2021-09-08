import { Draggable } from 'react-beautiful-dnd'
import { Icon } from '@wordpress/components';
import Tippy from '@tippyjs/react';
import { Menu as MenuIcon } from '@styled-icons/material-rounded/Search'

const NewItem = ({lesson, index}) => {

  const editNewItem = () => {
    alert(`Edit lesson: ${lesson.databaseId}`)
  }

  const deleteNewItem = () => {
    alert(`Delete lesson: ${lesson.databaseId}`)
  }

  return (
    
    <Draggable
    draggableId={lesson.databaseId.toString()}
    index={index}
    >
      { (provided, snapshot) => (
        <div className="border border-1 flex bg-main-semitransparent text-grey-dark justify-between"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="p-2">
            {lesson.title}
          </div>
          <div>
            <Tippy
              className="bg-main text-white p-2 cursor-pointer"
              interactive={true}
              hideOnClick={false}
              placement='right-start'
              theme="memberhub"
              // placement='right-start'
              // placement='right-end'
              // theme='light'
              content={
                <ul class="flex flex-col">
                  <li onClick={editNewItem}>Edit NewItem</li>
                  <li onClick={deleteNewItem}>Delete NewItem</li>
                </ul>
              }
            >
              <div className="p-2">
                <MenuIcon />
              </div>
              
            </Tippy>
          </div>
          {/* <Handle></Handle> */}
        </div>
      ) }
    </Draggable>
  )
}

export default NewItem
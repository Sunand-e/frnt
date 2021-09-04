import { Draggable } from 'react-beautiful-dnd'
import { Icon } from '@wordpress/components';
import Tippy from '@tippyjs/react';
import { Menu as MenuIcon } from '@styled-icons/material-rounded/Search'

export default function Item({item, index}) {

  const editLesson = () => {
    alert(`Edit lesson: ${item.databaseId}`)
  }

  const deleteLesson = () => {
    alert(`Delete lesson: ${item.databaseId}`)
  }

  return (
    
    <Draggable
    draggableId={item.databaseId.toString()}
    index={index}
    >
      { (provided, snapshot) => (
        <div className="border border-1 flex bg-main-semitransparent text-grey-dark justify-between"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="p-2">
            {item.title}
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
                  <li onClick={editLesson}>Edit Lesson</li>
                  <li onClick={deleteLesson}>Delete Lesson</li>
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
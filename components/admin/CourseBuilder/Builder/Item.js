import { Draggable } from 'react-beautiful-dnd'
import { Icon } from '@wordpress/components';
import Tippy from '@tippyjs/react';

export default function Item({item, index}) {


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
                <Icon icon="menu" />
              </div>
              
            </Tippy>
          </div>
          {/* <Handle></Handle> */}
        </div>
      ) }
    </Draggable>
  )
}
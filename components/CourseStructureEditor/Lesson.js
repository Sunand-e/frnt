import { Draggable } from 'react-beautiful-dnd'
import { Icon } from '@wordpress/components';
import Tippy from '@tippyjs/react';
import { Menu as MenuIcon } from '@styled-icons/material-rounded/Menu'

const Lesson = ({lesson, index, provided, snapshot}) => {

  const editLesson = () => {
    alert(`Edit lesson: ${lesson.id}`)
  }

  const deleteLesson = () => {
    alert(`Delete lesson: ${lesson.id}`)
  }

  return (

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
            <ul className="flex flex-col">
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
  )
}

export default Lesson
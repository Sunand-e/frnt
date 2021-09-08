import { Draggable } from 'react-beautiful-dnd'
import { Icon } from '@wordpress/components';
import Tippy from '@tippyjs/react';
import { Menu as MenuIcon } from '@styled-icons/material-rounded/Search'
import Lesson from './Lesson';
import Quiz from './Quiz';
import NewItem from './NewItem';

export default function DraggableItem({item, index}) {

  return (
    
    <Draggable
      draggableId={item.id}
      index={index}
    >
      { (provided, snapshot) => {

        const props = {item, index, provided, snapshot}
        console.log('item')
        console.log(item)
        switch(item.type) {
          case 'lesson':
            return <Lesson {...{lesson: item, ...props}} />;
          case 'quiz':
            return <Quiz {...props} />;
          default:
            return <NewItem {...props} />;
        }
      } }
    </Draggable>
  )
}
import React, { useEffect, useRef } from 'react';
import { Action, Handle, Remove } from '../dnd-kit'

import {MoreVert} from '@styled-icons/material/MoreVert'
import {Trash} from '@styled-icons/heroicons-outline/Trash'
import {Cog} from '@styled-icons/fa-solid/Cog'
import {ArrowUpward} from '@styled-icons/evaicons-solid/ArrowUpward'
import {ArrowDownward} from '@styled-icons/evaicons-solid/ArrowDownward'
import { useSortable } from '../dnd-kit/sortable/dist';
import styles from './BlockMenu.module.scss'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';
// import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';
// import 'tippy.js/animations/perspective.css';
// import 'tippy.js/animations/perspective-subtle.css';
// import 'tippy.js/animations/perspective-extreme.css';
// import 'tippy.js/animations/shift-away.css';
// import 'tippy.js/animations/shift-away-subtle.css';
import 'tippy.js/animations/shift-away-extreme.css';
// import 'tippy.js/animations/shift-toward.css';
// import 'tippy.js/animations/shift-toward-subtle.css';
// import 'tippy.js/animations/shift-toward-extreme.css';
const BlockMenu = ({
  id,
  onRemove,
  handle,
}) => {
  
  const {
    attributes,
    listeners,
  } = useSortable({id});

    const StyledButton = ({onClick=() => {}, className='', children}) => (
    <button onClick={onClick} className={`${className} px-4 py-3 flex align-left items-center rounded hover:bg-main-dark hover:bg-opacity-5 justify-center`}>
      {children}
    </button>
  )

  return (
    <Tippy 
      interactive={true}
      className={`${styles.BlockMenu} `}
      theme={'memberhub-block-menu'}
      arrow={false}
      placement={'bottom'}
      content={<div className={`flex flex-col rounded`}>

        <StyledButton>
          <ArrowUpward size="18" />
        </StyledButton>
        
        <StyledButton>
          <ArrowDownward size="18" />
        </StyledButton>
        
        <StyledButton>
          <Cog size="18" />
        </StyledButton>

        <StyledButton>
          <MoreVert size="18" />
        </StyledButton>
        {
          onRemove ? (
            <StyledButton onClick={() => onRemove(id)}>
              <Trash size="18" />
            </StyledButton>
          ) : null
        }
        </div>
      }
      animation={`scale-extreme`}
      >
        
      <div>
        <StyledButton 
          className={'bg-main px-4 bg-opacity-5 hover:bg-opacity-20'}
          >
        <MoreVert size="18" />
        </StyledButton>
      </div>
    </Tippy>
    /* {handle ? <Handle {...listeners} {...attributes} /> : null} */
  )
  
}

export default BlockMenu
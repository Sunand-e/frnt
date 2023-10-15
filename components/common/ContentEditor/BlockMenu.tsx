import React, { useContext, useEffect, useRef } from 'react';

import {MoreVert} from '@styled-icons/material/MoreVert'
import {Trash} from '@styled-icons/heroicons-outline/Trash'
import {Duplicate} from '@styled-icons/ionicons-solid/Duplicate'
import {Gear} from '@styled-icons/fa-solid/Gear'
import {ArrowUpward} from '@styled-icons/evaicons-solid/ArrowUpward'
import {ArrowDownward} from '@styled-icons/evaicons-solid/ArrowDownward'
import {DragIndicator} from '@styled-icons/material/DragIndicator'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-extreme.css';
import 'tippy.js/animations/shift-away-extreme.css';
import AddColumn from './Icons/AddColumn';
import useBlockEditor from './useBlockEditor';
import { addColumn, addTextAndImageChild, duplicateBlock, handleDeleteBlock, shiftPosition, useBlockStore } from './useBlockStore';
import classNames from '../../../utils/classNames';

const BlockMenu = ({ block, position='right', className='', dragListeners }) => {

  const blocks = useBlockStore(state => state.blocks)  
  const isChild = !blocks.some(b => b.id === block.id)
  const index = blocks.findIndex(b => b.id === block.id)


  const StyledButton = ({onClick = (e) => {}, className='', disabled=false, children}) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-3 flex align-left items-center rounded justify-center
        ${className}
      `}
    >
      {children}
    </button>
  )

  const allBlockMenuItems = [
    // {
    //   name: 'drag-handle',
    //   text: 'Drag',
    //   iconComponent: DragIndicator,
    //   isDisabled: () => index === 0,
    // },
    // {
    //   name: 'settings',
    //   text: 'Settings',
    //   iconComponent: Gear,
    //   onClick: showSettings
    // },
    {
      name: 'duplicate',
      text: 'Duplicate block',
      iconComponent: Duplicate,
      onClick: (e) => duplicateBlock(block),
      hideOnColumnBlocks: true
    },
    {
      name: 'delete',
      text: 'Delete block',
      iconComponent: Trash,
      onClick: (e) => handleDeleteBlock(block),
      hideOnColumnBlocks: true
    },
    {
      name: 'move-up',
      text: 'Move up',
      childText: 'Move left',
      childButtonClass: '-rotate-90',
      iconComponent: ArrowUpward,
      isDisabled: () => index === 0,
      onClick: () => shiftPosition(block,'up'),
    },
    {
      name: 'move-down',
      text: 'Move down',
      childText: 'Move right',
      childButtonClass: '-rotate-90',
      iconComponent: ArrowDownward,
      isDisabled: () => index === blocks.length-1,
      onClick: () => shiftPosition(block,'down')
    },
    {
      name: 'add-column',
      text: 'Add column',
      iconComponent: AddColumn,
      onClick: () => {
        addColumn(block)
      },
      isDisabled: () => (
        block.children?.length > 3 || block.name === "package"
      ),
      showOnBlocks: ['columns'],
      hideOnChild: true
    },
    {
      name: 'add-tab',
      text: 'Add tab',
      iconComponent: AddColumn,
      onClick: () => {
        addTextAndImageChild(block)
      },
      isDisabled: () => (
        block.children?.length > 7
      ),
      showOnBlocks: ['tabs'],
    },
    {
      name: 'add-panel',
      text: 'Add panel',
      iconComponent: AddColumn,
      onClick: () => {
        addTextAndImageChild(block)
      },
      isDisabled: () => (
        block.children?.length > 9
      ),
      showOnBlocks: ['carousel', 'accordion'],
    },

  ]

  let blockMenuItems = (isChild ? 
    allBlockMenuItems.filter(item => {
      return !item.hideOnChild
    }) : allBlockMenuItems).filter(item => {
      return item.showOnBlocks ? item.showOnBlocks.includes(block.type) : true
    })

  const itemTippyProps = {
    interactive: true,
    className: `text-white px-4 py-2 z-50`,
    theme: 'memberhub-block-menu light',
    arrow: true,
    placement: 'bottom'
  }

  const menuItems = blockMenuItems.map((menuItem, index) => {

    const IconComponent = menuItem.iconComponent

    return (
      // <span className={`absolute z-10 ${position==='left' ? 'left-2' : 'right-2'} top-2`}>
        <Tippy
          key={index}
          { ...itemTippyProps }
          content={(
            <p className={`${menuItem.isDisabled?.() && 'text-gray-400'} whitespace-nowrap`}>
              {isChild ? menuItem.childText ?? menuItem.text : menuItem.text }
            </p>
          )}
        >
          <div
            {...(menuItem.name === 'drag-handle' && dragListeners)}
          >
            <StyledButton
              className={`
                ${menuItem.isDisabled?.() && 'text-gray-400'}
                ${isChild && menuItem.childButtonClass}
              `}
              onClick={menuItem.onClick}
              // onClick={!menuItem.isDisabled?.() && menuItem.onClick}
              disabled={menuItem.isDisabled?.()}
              >
              <IconComponent size="18" />
            </StyledButton>
          </div>
        </Tippy>
      // </span>
    )
  })

  return (
    <span className={`absolute z-10 ${position==='left' ? 'left-2' : 'right-2'} top-2`}>   
      <Tippy
        interactive={true}
        theme={'memberhub-block-menu'}
        trigger="click"
        arrow={false}
        animation={`scale-extreme`}
        placement={'left'}
        content={(
          <div className={`flex rounded`}>
            { menuItems }
          </div>
        )}
        popperOptions={{
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: [],
              },
            },
          ]    
        }}
      >
        <div className={``}>
          <StyledButton 
            className={classNames(
              `shadow-md rounded-full px-4 bg-white hover:bg-opacity-70`,
              isChild && 'px-2 py-2',
              // 'bg-main',
              className
            )}
          >
          <MoreVert size="18" />
          { block.index }
          </StyledButton>
        </div>
      </Tippy>
      {/* {handle ? <Handle {...listeners} {...attributes} /> : null} */}
    </span>
  )
}

export default BlockMenu

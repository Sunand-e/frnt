import React, { useContext, useEffect, useRef } from 'react';

import {MoreVert} from '@styled-icons/material/MoreVert'
import {Trash} from '@styled-icons/heroicons-outline/Trash'
import {Gear} from '@styled-icons/fa-solid/Gear'
import {ArrowUpward} from '@styled-icons/evaicons-solid/ArrowUpward'
import {ArrowDownward} from '@styled-icons/evaicons-solid/ArrowDownward'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-extreme.css';
import 'tippy.js/animations/shift-away-extreme.css';
import AddColumn from './Icons/AddColumn';
import useBlockEditor from './useBlockEditor';
import { ModalContext } from '../../../context/modalContext';
import BlockSettings from './blocks/common/BlockSettings';
import blocktypes from './blocktypes';
import { shiftPosition, useBlockStore } from './useBlockStore';

const BlockMenu = ({ block, className='' }) => {

  const blocks = useBlockStore(state => state.blocks)

  const { addColumn, handleDeleteBlock } = useBlockEditor()
  
  const isChild = !blocks.some(b => b.id === block.id)

  const index = blocks.findIndex(b => b.id === block.id)

  const { handleModal } = useContext(ModalContext)

  const showSettings = () => {
    handleModal({
      title: `${blocktypes[block.type].text} settings`,
      content: <BlockSettings block={block} />,
      size: 'lg'
    })
  }

  const StyledButton = ({onClick = (e) => {}, className='', disabled=false, children}) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-3 flex align-left items-center rounded hover:bg-main-secondary hover:bg-opacity-5 justify-center
        ${className}
      `}
    >
      {children}
    </button>
  )

  const allBlockMenuItems = [
    {
      name: 'settings',
      text: 'Settings',
      iconComponent: Gear,
      onClick: showSettings
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
      name: 'delete',
      text: 'Delete block',
      iconComponent: Trash,
      onClick: (e) => handleDeleteBlock(block),
      hideOnColumnBlocks: true
    },
  ]

  let blockMenuItems = (isChild ? 
    allBlockMenuItems.filter(item => {
      return !item.hideOnChild
    }) : allBlockMenuItems).filter(item => {
      return item.showOnBlocks ? item.showOnBlocks.includes(block.type) : true
    })

  const menuItems = blockMenuItems.map((menuItem, index) => {

    const IconComponent = menuItem.iconComponent

    return (
      <Tippy
        key={index}
        interactive={true}
        className={`text-white px-4 py-2 z-50`}
        theme={'memberhub-block-menu light'}
        arrow={true}
        placement={'left'}
        content={(
          <p className={`${menuItem.isDisabled?.() && 'text-gray-400'} whitespace-nowrap`}>
            {isChild ? menuItem.childText ?? menuItem.text : menuItem.text }
          </p>
        )}
      >
        <div>
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
    )
  })

  if(!isChild) {
    return (
      <div className={`flex flex-col rounded bg-white text-gray-600 ${className}`}>
        { menuItems }
      </div>
    )
  }

  return (
    <Tippy
      interactive={true}
      theme={'memberhub-block-menu'}
      trigger="click"
      arrow={false}
      animation={`scale-extreme`}
      placement={'bottom'}
      content={(
        <div className={`flex flex-col rounded`}>
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
          className={`
            px-4 bg-opacity-5 hover:bg-opacity-20 ${isChild ? 'bg-opacity-60 bg-white px-2 py-1' : 'bg-main'}
          `}
        >
        <MoreVert size="18" />
        { block.index }
        </StyledButton>
      </div>
    </Tippy>
    /* {handle ? <Handle {...listeners} {...attributes} /> : null} */
  )
}

export default BlockMenu

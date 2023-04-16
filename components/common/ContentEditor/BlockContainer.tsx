import React, { useEffect, useState } from 'react'
import BlockMenu from './BlockMenu'
import useBlockEditor from './useBlockEditor'
import BlockFooter from './BlockFooter'
import { useReactiveVar } from "@apollo/client";
import { BlockEdit } from './BlockEdit'
import { getBlock, getIndexAndParent, useBlockStore } from './useBlockStore'
import { useEditorViewStore } from './useEditorViewStore';

const BlockContainer = ({
  id,
  isColumn = false,
  dragging = false,
  dragListeners = null,
  // onClick: handleClick, 
  handle = true,
}) => {

  const [ showFooter, setShowFooter ]  = useState(false)
  const blocks = useBlockStore(state => state.blocks)
  const activeBlockId = useBlockStore(state => state.activeBlockId)

  const block = getBlock(id)
  const { index, parent } = getIndexAndParent(id)
  
  const isActive = activeBlockId === block.id
  
  useEffect(() => {
    if(!isColumn && index !== blocks.length -1) {
      setShowFooter(true)
    } else {
      setShowFooter(false)
    }
  },[blocks])

  return (
    <div 
      className={`group flex flex-col h-full ${parent ? '' : ''}`}
      style={{
        backgroundColor: block?.properties?.bgColor,
        color: block?.properties?.textColor || 'inherit'
      }}
    >
      {/* <pre>
      { JSON.stringify(parent,null,2) }
      </pre> */}
      <div
        className={`
          ${isColumn ? 'h-full' : 'group-hover:bg-opacity-5 hover:bg-main'}
          ${parent?.id ? 'px-4' : ''}
          relative flex flex-col items-center
        `}
        style={{
          paddingTop: block?.properties?.paddingTop,
          paddingBottom: block?.properties?.paddingBottom,
          paddingLeft: block?.properties?.paddingLeft,
          paddingRight: block?.properties?.paddingRight,
        }}
        onClick={() => {
          // alert(id)
          useBlockStore.setState({
            activeBlockId: block.id
          })
          useEditorViewStore.setState({
            activeSettingsPanel: 'block'
          })
        }}
      >
        <span className={`absolute z-10 right-2 top-2`}>
        {/* <span className={`absolute -right-14`}> */}
          <BlockMenu
            block={block}
            dragListeners={dragListeners}
            className={`
              ${!isActive && 'block'}
              ${!isColumn && 'bg-white rounded hidden group-hover:block'}
            `}
          />

        </span>
        <BlockEdit id={id} />
      </div>
      {
        showFooter && <BlockFooter block={block} />
      }
    </div>
  );
}

export default BlockContainer
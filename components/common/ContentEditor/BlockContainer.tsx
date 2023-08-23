import React, { useEffect, useState } from 'react'
import BlockMenu from './BlockMenu'
import useBlockEditor from './useBlockEditor'
import BlockFooter from './BlockFooter'
import { useReactiveVar } from "@apollo/client";
import { BlockEdit } from './BlockEdit'
import { getBlock, getIndexAndParent, useBlockStore } from './useBlockStore'
import { showBlocksPanel, useEditorViewStore } from './useEditorViewStore';
import classNames from '../../../utils/classNames';

const BlockContainer = ({
  id,
  isColumn = false,
  dragging = false,
  dragListeners = null,
  // onClick: handleClick, 
  handle = true,
}) => {

  const [ showFooter, setShowFooter ]  = useState(false)
  const activeBlockId = useBlockStore(state => state.activeBlockId)

  const block = getBlock(id)
  const { index, parent } = getIndexAndParent(id)
  
  const isActive = activeBlockId === block.id
  
  useEffect(() => {
    // if(!isColumn && index !== blocks.length -1) {
    setShowFooter(!isColumn)
  },[isColumn])

  const isLastColumn = parent && parent.type === 'columns' && index === parent.children.length - 1

  let bgStyleString = ''
  if(block.style?.bgImageEnabled) {
    if(block?.style?.overlayColor) {
      bgStyleString = `
        linear-gradient(
          ${block?.style?.overlayColor}, 
          ${block?.style?.overlayColor}
        ),
      `
    }
    bgStyleString += `url(${block?.style?.bgImage?.location})`
  } else {
    bgStyleString = block.style?.bgColor
  }
  
  console.log('bgStyleString')
  console.log(bgStyleString)

  return (
    <div 
      className={classNames(
        `relative group flex flex-col h-full`,
      )}
      style={{
        backgroundColor: block.style?.bgColor,
        ...(block.style?.bgImageEnabled && { 
          backgroundImage: bgStyleString
        }),
        backgroundPosition: block?.style?.backgroundPosition || 'center',
        backgroundSize: 'cover',
        color: block?.style?.textColor || 'inherit'
      }}
    >
      <div
        className={classNames(
          isColumn ? 'h-full' : 'group-hover:bg-opacity-5 hover:bg-main',
          parent?.id ? 'px-4' : '',
          'relative flex flex-col items-center',
          isActive && 'rounded-md border-dashed border-main/60 border-2',
        )}
        style={{
          paddingTop: block?.properties?.paddingTop,
          paddingBottom: block?.properties?.paddingBottom,
          paddingLeft: block?.properties?.paddingLeft,
          paddingRight: block?.properties?.paddingRight,
        }}
        onClick={(e) => {
          if(block.type === 'placeholder') {

          } else {
            e.stopPropagation()
            showBlocksPanel()
            useBlockStore.setState({
              activeBlockId: block.id
            })
            useEditorViewStore.setState({
              activeSettingsPanel: 'block'
            })
          }
        }}
      >
        { (!parent || parent.type === 'columns') && (
          <BlockMenu
            block={block}
            dragListeners={dragListeners}
            position={isLastColumn ? 'left' : 'right'}
            className={classNames(
              // 'bg-white rounded group-hover:flex',
              !isActive && 'hidden',
              !isColumn && 'bg-white rounded group-hover:flex'
            )}
          />
        )}
        <BlockEdit id={id} />
      </div>
      {
        showFooter && <BlockFooter block={block} />
      }
    </div>
  );
}

export default BlockContainer
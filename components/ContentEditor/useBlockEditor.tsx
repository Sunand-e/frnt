import ReactDOM from "react-dom"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { Flipper, Flipped } from "react-flip-toolkit"
import shuffle from "lodash.shuffle"
import { arrayMove } from "@dnd-kit/sortable";
import cache, { activeContentBlockVar, currentContentItemVar } from "../../graphql/cache";
import { ContentFragment } from "../../graphql/queries/allQueries";
import { useDebouncedCallback } from 'use-debounce';
import { ModalContext } from "../../context/modalContext";
import BlockContainer from "./BlockContainer";
import DeleteContentBlockModal from "../admin/courses/DeleteContentBlockModal";
import BlockSelector from "./BlockSelector";
import blocktypes from "./blocktypes"; 
import { v4 as uuidv4 } from 'uuid';
import { useReactiveVar } from "@apollo/client";
// import "./styles.css";

const useBlockEditor = (block=null) => {

  const { id, type, updateFunction } = currentContentItemVar()
  
  const { content: { blocks } } = cache.readFragment({
    id:`ContentItem:${id}`,
    fragment: ContentFragment,
  }, true)
  
  useEffect(() => {

  },[blocks])
  
  const insertBlock = useCallback((newBlock, index=null, parent=null, replace = false) => {
    
    console.log('once')
    let overwrite = replace ? 1 : 0
    
    let newTopLevelBlock;
    let topLevelIndex;

    if(parent) {
      topLevelIndex = blocks.findIndex(block => block.id === parent.id)

      const childBlocks = [
        ...parent.children.slice(0, index),
        newBlock,
        ...parent.children.slice(index + overwrite)
      ]

      newTopLevelBlock = {
        ...parent,
        children: childBlocks
      }
      
      overwrite = 1

    } else {
      topLevelIndex = index
      newTopLevelBlock = newBlock
    }

    const newBlocks = [
      ...blocks.slice(0, topLevelIndex),
      newTopLevelBlock,
      ...blocks.slice(topLevelIndex + overwrite)
    ]
    
    updateFunction(newBlocks);
  },[blocks])
  

  const getIndexAndParent = (block) => {
    let parent = null

    let index = blocks.findIndex(b => b.id === block.id)

    if(index < 0) {
      let blocksWithChildren = blocks.filter(block => block.type === 'columns')
      parent = blocksWithChildren.find(b => b.children?.some(child => child.id === block.id))
      index = parent.children.findIndex(b => b.id === block.id)
    }

    return { index, parent }
  }


  const updateBlock = (block, newBlock=null) => {
    // console.log('updateBlock', block)
    const { index, parent } = getIndexAndParent(block)
    
    insertBlock(newBlock ?? block, index, parent, 1)
    
  }

  const addBlock = (newBlock, replace=false) => {
    if(block) {
      if(replace) {
        updateBlock(block, newBlock)
      } else {
        const { index, parent } = getIndexAndParent(block)
        insertBlock(newBlock, index + 1, parent, replace)
      }
    } else {
      insertBlock(newBlock, blocks.length, null, replace)
    }
  }

  
  const debouncedUpdateBlock = useDebouncedCallback((block) => {
    updateBlock(block);
  }, 2000);
  
  
  
  
  
  const deleteBlock = block => {
    
    const { index, parent } = getIndexAndParent(block)
    
    let newBlocks
    
    // if the block is contained in a column:
    if(parent) {
      
      // if we're only leaving one block, replace columns with that block
      if(parent.children.length === 2) {

        const newBlock = parent.children.find(b => b.id !== block.id)
        console.log('newBlock')
        console.log(newBlock)
        updateBlock(parent, newBlock)

      // otherwise, remove the block from the column
      } else {
        const topLevelIndex = blocks.findIndex(block => block.id === parent.id)
      
        newBlocks = [
          ...blocks.slice(0, topLevelIndex),
          {
            ...parent,
            children: parent.children.filter(b => b.id !== block.id)
          },
          ...blocks.slice(topLevelIndex + 1)
        ]
        updateFunction(newBlocks)
      }

    // if the block is NOT contained in a column, remove the block
    } else {
      newBlocks = blocks.filter(b => b.id !== block.id)
      updateFunction(newBlocks)
    }
  }

  
  const blockIds = blocks.map(block => block.id);
  
  const { handleModal, closeModal } = useContext(ModalContext);

  const deleteColumnsBlock = (block, preserveChildren = true) => {
    closeModal()
  }
  
  
  const handleDeleteBlock = (block) => {

    // if(block.type === 'columns') {
    //   handleModal({
    //     title: `Delete ${block.type}`,
    //     content: (
    //       <div className="flex flex-col space-y-2 mt-5 sm:mt-6">
    //         <p>Do you want to delete only the column block, or all of its children blocks too?</p>
    //       <button
    //         type="button"
    //         className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm"
    //         onClick={() => deleteColumnsBlock(block, true)}
    //       >
    //         Preserve children blocks
    //       </button>
    //       <button
    //         type="button"
    //         className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm"
    //         onClick={() => deleteColumnsBlock(block, false)}
    //         >
    //           Delete children blocks
    //       </button>
    //     </div>
    //     )
    //   })    

    // } else {
      handleModal({
        title: `Delete ${block.type}`,
        content: <DeleteContentBlockModal onDelete={() => deleteBlock(block)} block={block} />
      })    
    // }

  }

  const shiftPosition = (block, direction='down') => {

    const { index, parent } = getIndexAndParent(block)

    // alert('shiftPosition!' + index)
    const modifier = direction === 'down' ? 1 : -1

    let newBlocks

    if(parent) {
      const topLevelIndex = blocks.findIndex(block => block.id === parent.id)
      
      newBlocks = [
        ...blocks.slice(0, topLevelIndex),
        {
          ...blocks[topLevelIndex],
          children: arrayMove(blocks[topLevelIndex].children, index, index+modifier )
        },
        ...blocks.slice(topLevelIndex + 1)
      ]
    } else {
      newBlocks = arrayMove(blocks, index, index+modifier )
    }

    updateFunction(newBlocks);
  }

  const createPlaceholderBlock = () => {
    return {
      type: 'placeholder',
      id: uuidv4(),
      properties: {}
    }
  }

  const createColumnsBlock = () => {
    return {
      type: 'columns',
      id: uuidv4(),
      properties: {}
    }
  }

  const addColumn = block => {
    let newTopLevelBlock
    if(block.type === 'columns') {
      newTopLevelBlock = {
        ...block,
        children: [
          ...block.children,
          createPlaceholderBlock()
        ]
      }
    } else {
      newTopLevelBlock = {
        ...createColumnsBlock(),
        children: [
          block,
          createPlaceholderBlock()
        ]
      }
    }
    updateBlock(block, newTopLevelBlock)
  }

  return {
    blocks,
    blockIds,
    addColumn,
    shiftPosition,
    insertBlock,
    addBlock,
    updateBlock,
    getIndexAndParent,
    activeBlockId: activeContentBlockVar(),
    debouncedUpdateBlock,
    handleDeleteBlock
  }
};

export default useBlockEditor

import create from 'zustand'
import { arrayMove } from "@dnd-kit/sortable";
import { UniqueIdentifier } from '@dnd-kit/core';

export interface Block {
  type: string,
  id: string,
  children?: Block[]
  properties?: {[key: string]: any}
  widths?: {[key: string]: any}
}

type BlockState = {
  isDirty: boolean
  blocks: Block[]
  activeDragItem: any
  lastAddedItemId: any
  activeBlockId: string
  setIsDirty: (isDirty) => void
  editBlocks: (blocks: Block[]) => void
  setBlocks: (blocks: Block[]) => void
  insertBlock: (newBlock: Block, index?: number, parent?: Block | null, replace?: boolean) => void
  sidebarFieldsRegenKey: number
}

export const useBlockStore = create<BlockState>(set => ({
  isDirty: false,
  activeDragItem: null,
  lastAddedItemId: null,
  activeBlockId: null,
  setIsDirty: (isDirty) => set(state => ({ isDirty })),
  blocks: [],
  draggingRowHeight: null,
  sidebarFieldsRegenKey: Date.now(),
  editBlocks: (blocks) => set(state => ({ blocks, isDirty: true })),
  setBlocks: (blocks) => {
    return set(state => ({ blocks, isDirty: false }))
  },
  insertBlock: (newBlock, index=null, parent=null, replace = false) => set(state => {
    let overwrite = replace ? 1 : 0
    let newTopLevelBlock, topLevelIndex;
    if(parent) {
      topLevelIndex = state.blocks.findIndex(block => block.id === parent.id)

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
    
    return {
      blocks: [
        ...state.blocks.slice(0, topLevelIndex),
        newTopLevelBlock,
        ...state.blocks.slice(topLevelIndex + overwrite)
      ],
      isDirty: true
    }
  }),
}))


export const shiftPosition = (block: Block, direction='down') => {

  const { blocks } = useBlockStore.getState()
  const { index, parent } = getIndexAndParent(block.id)
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

  useBlockStore.setState({blocks: newBlocks, isDirty: true });
}

export const getIndexAndParent = (id) => {
  const { blocks } = useBlockStore.getState()
  let parent = null
  let index = blocks.findIndex(b => b.id === id)
  if(index < 0) {
    let blocksWithChildren = blocks.filter(({type}) => type === 'columns')
    parent = blocksWithChildren.find(b => b.children?.some(child => child.id === id))
    index = parent?.children.findIndex(b => b.id === id)
  }
  return { index, parent }
}


export const getBlock = (id) => {
  const { blocks } = useBlockStore.getState()
  
  let parent = null

  let index = blocks.findIndex(b => b.id === id)
  
  let block

  if(index < 0) {
    let blocksWithChildren = blocks.filter(({type}) => type === 'columns')
    parent = blocksWithChildren.find(b => b.children?.some(child => child.id === id))
    if(!parent) {
      return null
    }
    index = parent.children.findIndex(b => b.id === id)
    block = parent.children[index]
  } else {
    block = blocks[index]
  }
  return block
}

export const setActiveDragItem = (item) => {
  useBlockStore.setState({activeDragItem: item });
}
import create from 'zustand'
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from 'uuid';

const blockTypesWithChildren = ['columns','tabs','accordion','carousel']
export interface Block {
  type: string,
  id: string,
  children?: Block[]
  properties?: {[key: string]: any}
  style?: {[key: string]: any}
  widths?: {[key: string]: any}
}

type BlockState = {
  isDirty: boolean
  blocks: Block[]
  activeDragItem: any
  lastAddedItemId: any
  activeBlockId: string
  blockRefs: Map<string, HTMLElement>
  zIndexes: Map<string, string>
  computed: {
    activeBlock: () => Block
    getBlock: (id: string) => Block
  }
  setIsDirty: (isDirty: boolean) => void
  editBlocks: (blocks: Block[]) => void
  setBlocks: (blocks: Block[], isDirty?: boolean) => void
  insertBlock: (newBlock: Block, index?: number, parent?: Block | null, replace?: boolean) => void
  updateBlock: (block: Block, newBlock?: Block) => void
  // setBlockRef: (blockId: string, ref: HTMLElement) => void
  sidebarFieldsRegenKey: number
}

export const useBlockStore = create<BlockState>((set, get) => ({
  isDirty: false,
  activeDragItem: null,
  lastAddedItemId: null,
  activeBlockId: null,
  zIndexes: new Map(),
  blockRefs: new Map(),
  setIsDirty: (isDirty) => set(state => ({ isDirty })),
  blocks: [],
  draggingRowHeight: null,
  sidebarFieldsRegenKey: Date.now(),
  computed: {
    // See: https://github.com/pmndrs/zustand/issues/132#issuecomment-1120467721
    activeBlock: () => getBlock(get().activeBlockId),
    getBlock: (id) => {

      const blocks = get().blocks
      let parent = null
    
      let index = blocks.findIndex(b => b.id === id)
      
      let block
    
      if(index < 0) {
        let blocksWithChildren = blocks.filter(({type}) => blockTypesWithChildren.includes(type))
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
  },
  editBlocks: (blocks) => set(state => ({ blocks, isDirty: true })),
  setBlocks: (blocks, isDirty=false) => {
    return set(state => ({ blocks, isDirty }))
  },
  updateBlock: (block: Block, newBlock: Block = null) => {
    const { index, parent } = getIndexAndParent(block.id)
    get().insertBlock(newBlock ?? block, index, parent, true)
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

export const getIndexAndParent = (id: string) => {
  const { blocks } = useBlockStore.getState()
  let parent = null
  let index = blocks.findIndex(b => b.id === id)
  if(index < 0) {
    let blocksWithChildren = blocks.filter(({type}) => blockTypesWithChildren.includes(type))
    parent = blocksWithChildren.find(b => b.children?.some(child => child.id === id))
    index = parent?.children.findIndex(b => b.id === id)
  }
  return { index, parent }
}


export function getBlock(id: string): Block {
  const { blocks } = useBlockStore.getState()
  
  let parent = null
  let index = blocks.findIndex(b => b.id === id)  
  let block

  if(index < 0) {
    let blocksWithChildren = blocks.filter(({type}) => blockTypesWithChildren.includes(type))
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

export const createBlock = (properties) => ({
  type: properties.type.name,
  id: uuidv4(),
  properties: {
    paddingTop: '20px',
    paddingBottom: '20px',
    ...properties?.properties
  },
  ...properties
})


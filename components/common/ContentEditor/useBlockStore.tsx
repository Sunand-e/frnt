import create from 'zustand'
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from 'uuid';
import { handleModal } from '../../../stores/modalStore';
import DeleteContentBlockModal from './DeleteContentBlockModal';

const blockTypesWithChildren = ['columns','tabs','accordion','carousel']
export interface Block {
  type: string,
  id: string,
  children?: Block[]
  properties?: {[key: string]: any}
  style?: {[key: string]: any}
  editorSettings?: {
    defaultAlignment: string
  }
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
  // deleteBlock: (block: Block) => void
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
  ...properties,
  style: {
    paddingTop: '30px',
    paddingBottom: '30px',
    ...properties?.style
  },
})


export const addBlock = (newBlock: Block, replace=false, atBlock=null) => {
  useBlockStore.setState({lastAddedItemId: newBlock.id});
  const { updateBlock, blocks, insertBlock } = useBlockStore.getState()
  if(atBlock) {
    if(replace) {
      updateBlock(atBlock, newBlock)
    } else {
      const { index, parent } = getIndexAndParent(atBlock.id)
      insertBlock(newBlock, index + 1, parent, replace)
    }
  } else {
    insertBlock(newBlock, blocks.length, null, replace)
  }
}

export const updateBlockProperties = (block: Block, properties={}) => {
  const { updateBlock } = useBlockStore.getState()

  const updatedBlock = {
    ...block,
    properties: {
      ...block.properties,
      ...properties
    }
  }
  updateBlock(updatedBlock)
  return updatedBlock
}

export const updateBlockStyles = (block: Block, style={}) => {
  const { updateBlock } = useBlockStore.getState()
  const updatedBlock = {
    ...block,
    style: {
      ...block.style,
      ...style
    }
  }
  updateBlock(updatedBlock)
  return updatedBlock
}

export const deleteBlock = (block: Block) => {
  const { blocks, updateBlock, setBlocks } = useBlockStore.getState()

  const { index, parent } = getIndexAndParent(block.id)

  let newBlocks
  // if the block is contained in a column:
  if(parent) {
    
    // if we're only leaving one block, replace columns with that block.
    // This causes issues when we have stateful components, eg. RTEs. 
    // See: https://www.reddit.com/r/reactjs/comments/gp7yld/reparenting_is_now_possible_with_react/
    // if(parent.children.length === 2) {
    //   const newBlock = parent.children.find(b => b.id !== block.id)
    //   updateBlock(parent, newBlock)


    // If there are only two cols, replce the block with a placeholder.
    if(parent.type === 'columns' && parent.children.length === 2) {
      const newBlock = createBlock({type: 'placeholder'})
      updateBlock(block, newBlock)
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
      setBlocks(newBlocks, true)
    }

  // if the block is NOT contained in a column, remove the block
  } else {
    newBlocks = blocks.filter(b => b.id !== block.id)
    setBlocks(newBlocks, true)
  }
}
  
export const addColumn = (block: Block) => {
  const { updateBlock } = useBlockStore.getState()
  let newTopLevelBlock
  if(block.type === 'columns') {
    let currentColumnCount = block.children.length
    let newColWidth = 12 / (currentColumnCount + 1)
    const widths = Array(currentColumnCount + 1).fill(newColWidth)

    newTopLevelBlock = {
      ...block,
      widths,
      children: [
        ...block.children,
        createBlock({type: 'placeholder'})
      ]
    }
  }
  // // This was for if we wanted to convert a regular block to columns;
  // else {
  //   newTopLevelBlock = {
  //     ...createColumnsBlock(),
  //     widths: [6,6],
  //     children: [
  //       block,
  //       createPlaceholderBlock()
  //     ]
  //   }
  // }
  updateBlock(block, newTopLevelBlock)
}

export const addTextAndImageChild = (block: Block) => {
  const { updateBlock } = useBlockStore.getState()
  let newTopLevelBlock
  newTopLevelBlock = {
    ...block,
    children: [
      ...block.children,
      createBlock({type: 'textAndImage'})
    ]
  }
  updateBlock(block, newTopLevelBlock)
}

export const handleDeleteBlock = (block: Block, typeLabel: String, onDelete: () => void = null) => {

  const handleDelete = () => {
    deleteBlock(block)
    onDelete && onDelete()
  }
  handleModal({
    title: `Delete block`,
    content: <DeleteContentBlockModal typeLabel={typeLabel} onDelete={handleDelete} block={block} />
  })
}
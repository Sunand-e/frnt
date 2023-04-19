import { useDebouncedCallback } from 'use-debounce';
import DeleteContentBlockModal from "./DeleteContentBlockModal";
import { v4 as uuidv4 } from 'uuid';
import {useBlockStore, getIndexAndParent, shiftPosition, getBlock, Block} from './useBlockStore';
import { handleModal } from "../../../stores/modalStore";
// import isEqual from 'lodash/isEqual';

// import "./styles.css";
// 
const useBlockEditor = (block: Block = null) => {

  const { blocks, setBlocks, insertBlock } = useBlockStore()

  const updateBlock = (block: Block, newBlock: Block = null) => {
    const { index, parent } = getIndexAndParent(block.id)
    // if(!isEqual(block, getBlock(block.id))) {
      // if newblock is provided, replace the top level 
      insertBlock(newBlock ?? block, index, parent, true)
    // }
  }

  const updateBlockProperties = (block: Block, properties={}) => {
    
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

  const addBlock = (newBlock: Block, replace=false, focus=true) => {

    useBlockStore.setState({lastAddedItemId: newBlock.id});

    if(block) {
      if(replace) {
        updateBlock(block, newBlock)
      } else {
        const { index, parent } = getIndexAndParent(block.id)
        insertBlock(newBlock, index + 1, parent, replace)
      }
    } else {
      insertBlock(newBlock, blocks.length, null, replace)
    }
  }

  
  const debouncedUpdateBlock = useDebouncedCallback((block) => {
    updateBlock(block);
  }, 300);
  
  const deleteBlock = (block: Block) => {
    
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
      if(parent.children.length === 2) {
        const newBlock = createPlaceholderBlock()
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
        setBlocks(newBlocks)
      }

    // if the block is NOT contained in a column, remove the block
    } else {
      newBlocks = blocks.filter(b => b.id !== block.id)
      setBlocks(newBlocks)
    }
  }
  
  const handleDeleteBlock = (block: Block) => {
    handleModal({
      title: `Delete block`,
      content: <DeleteContentBlockModal onDelete={() => deleteBlock(block)} block={block} />
    })
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

  const addColumn = (block: Block) => {
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
          createPlaceholderBlock()
        ]
      }
    } else {
      newTopLevelBlock = {
        ...createColumnsBlock(),
        widths: [6,6],
        children: [
          block,
          createPlaceholderBlock()
        ]
      }
    }
    updateBlock(block, newTopLevelBlock)
  }

  // const addColumn = block => {
  //   let newTopLevelBlock
  //   if(block.type === 'columns') {
  //     let currentColumnCount = block.children.length
  //     let newColWidth = 12 / (currentColumnCount + 1)
  //     const widths = Array(currentColumnCount + 1).fill(newColWidth)

  //     newTopLevelBlock = {
  //       ...block,
  //       widths,
  //       children: [
  //         ...block.children,
  //         createPlaceholderBlock()
  //       ]
  //     }
  //   } else {
  //     newTopLevelBlock = {
  //       ...createColumnsBlock(),
  //       widths: [6,6],
  //       children: [
  //         block,
  //         createPlaceholderBlock()
  //       ]
  //     }
  //   }
  //   // alert(JSON.stringify(newTopLevelBlock,null,2))
  //   updateBlock(block, newTopLevelBlock)
  // }

  return {
    blocks,
    addColumn,
    shiftPosition,
    insertBlock,
    addBlock,
    updateBlock,
    updateBlockProperties,
    getIndexAndParent,
    debouncedUpdateBlock,
    handleDeleteBlock
  }
};

export default useBlockEditor
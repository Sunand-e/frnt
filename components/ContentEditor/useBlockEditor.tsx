import {  useContext } from "react"
import { activeContentBlockVar, currentContentItemVar } from "../../graphql/cache";
import { useDebouncedCallback } from 'use-debounce';
import { ModalContext } from "../../context/modalContext";
import DeleteContentBlockModal from "./DeleteContentBlockModal";
import { v4 as uuidv4 } from 'uuid';
import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import {useBlockStore, getIndexAndParent, shiftPosition, getBlock} from './useBlockStore';
// import isEqual from 'lodash/isEqual';

// import "./styles.css";
// 
const GET_LESSON_CONTENT = gql`
query GetLessonContent($id: ID!) {
  lesson(id: $id) {
    content
  }
}
`

const GET_LIBRARY_ITEM_CONTENT = gql`
query GetLibraryItemContent($id: ID!) {
  libraryItem(id: $id) {
    content
  }
}
`

const useBlockEditor = (block=null) => {

  // testing::::
  const currentContentItem = useReactiveVar(currentContentItemVar)
    
  const { id, type } = currentContentItem

  const { blocks, setBlocks, insertBlock } = useBlockStore()
  
  let contentQuery;
  
  switch(type) {
    case 'lesson':
      contentQuery = GET_LESSON_CONTENT
      break
    case 'libraryItem':
    default:
      contentQuery = GET_LIBRARY_ITEM_CONTENT
      break
  }

  const [getContent, { loading, error, data }] = useLazyQuery(
    contentQuery,
    {
      variables: { id },
      onCompleted: () => {}
    }
  )
  
  const content = data?.[type]?.content


  const updateBlock = (block, newBlock=null) => {
    const { index, parent } = getIndexAndParent(block.id)
    // if(!isEqual(block, getBlock(block.id))) {
      // if newblock is provided, replace the top level 
      console.log('blocks')
      console.log(blocks) 
      insertBlock(newBlock ?? block, index, parent, 1)
      console.log('blocks2')
      console.log(blocks) 
    // }
  }

  const updateBlockProperties = (block, properties={}) => {
    
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

  const addBlock = (newBlock, replace=false) => {
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
  }, 500);
  
  const deleteBlock = block => {
    
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
  
  const { handleModal } = useContext(ModalContext);

  
  const handleDeleteBlock = (block) => {
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

  const addColumn = block => {
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
    getContent,
    content,
    blocks,
    addColumn,
    shiftPosition,
    insertBlock,
    addBlock,
    updateBlock,
    updateBlockProperties,
    getIndexAndParent,
    activeBlockId: activeContentBlockVar(),
    debouncedUpdateBlock,
    handleDeleteBlock
  }
};

export default useBlockEditor

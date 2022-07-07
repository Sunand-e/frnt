import { useCallback, useContext, useEffect } from "react"
import { arrayMove } from "@dnd-kit/sortable";
import cache, { activeContentBlockVar, currentContentItemVar } from "../../graphql/cache";
import { ContentFragment } from "../../graphql/queries/allQueries";
import { useDebouncedCallback } from 'use-debounce';
import { ModalContext } from "../../context/modalContext";
import DeleteContentBlockModal from "./DeleteContentBlockModal";
import { v4 as uuidv4 } from 'uuid';
import { gql, useQuery, useReactiveVar } from "@apollo/client";
// import "./styles.css";

const useBlockEditor = (block=null) => {

  // testing::::
  const currentContentItem = useReactiveVar(currentContentItemVar)
    
  const { id, type, updateFunction } = currentContentItem
  // end testing
  // const { id, type, updateFunction } = currentContentItemVar()
  
  const updateBlockContent = (blocks) => {
    updateFunction({content: { blocks }})
  }

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

  const { loading, error, data = {} } = useQuery(
    contentQuery,
    {
      variables: { id },
      onCompleted: () => {}
    }
  )
  
  const blocks = data[type]?.content?.blocks || [];

  const insertBlock = useCallback((newBlock, index=null, parent=null, replace = false) => {
    
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
    
    updateBlockContent(newBlocks);
  },[blocks])
  

  const getIndexAndParent = useCallback((id) => {
    let parent = null

    let index = blocks.findIndex(b => b.id === id)

    if(index < 0) {
      let blocksWithChildren = blocks.filter(({type}) => type === 'columns')
      parent = blocksWithChildren.find(b => b.children?.some(child => child.id === id))
      index = parent?.children.findIndex(b => b.id === id)
    }

    return { index, parent }
  }, [blocks])

  const getBlock = (id) => {
    let parent = null

    let index = blocks.findIndex(b => b.id === id)

    let block

    if(index < 0) {
      let blocksWithChildren = blocks.filter(({type}) => type === 'columns')
      parent = blocksWithChildren.find(b => b.children?.some(child => child.id === id))
      index = parent.children.findIndex(b => b.id === id)
      block = parent.children[index]
    } else {
      block = blocks[index]
    }
    return block
  }


  const updateBlock = (block, newBlock=null) => {
    const { index, parent } = getIndexAndParent(block.id)
    
    insertBlock(newBlock ?? block, index, parent, 1)
    
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
      
      // if we're only leaving one block, replace columns with that block
      if(parent.children.length === 2) {

        const newBlock = parent.children.find(b => b.id !== block.id)
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
        updateBlockContent(newBlocks)
      }

    // if the block is NOT contained in a column, remove the block
    } else {
      newBlocks = blocks.filter(b => b.id !== block.id)
      updateBlockContent(newBlocks)
    }
  }

  
  const blockIds = blocks.map(block => block.id);
  
  const { handleModal, closeModal } = useContext(ModalContext);

  const deleteColumnsBlock = (block, preserveChildren = true) => {
    closeModal()
  }
  
  
  const handleDeleteBlock = (block) => {
      handleModal({
        title: `Delete block`,
        content: <DeleteContentBlockModal onDelete={() => deleteBlock(block)} block={block} />
      })    
  }

  const shiftPosition = (block, direction='down') => {

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

    updateBlockContent(newBlocks);
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
    // alert(JSON.stringify(newTopLevelBlock,null,2))
    updateBlock(block, newTopLevelBlock)
  }

  return {
    blocks,
    blockIds,
    addColumn,
    shiftPosition,
    insertBlock,
    addBlock,
    getBlock,
    updateBlock,
    updateBlockProperties,
    getIndexAndParent,
    activeBlockId: activeContentBlockVar(),
    debouncedUpdateBlock,
    handleDeleteBlock
  }
};

export default useBlockEditor

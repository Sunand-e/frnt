import { useDebouncedCallback } from 'use-debounce';
import DeleteContentBlockModal from "./DeleteContentBlockModal";
import {useBlockStore, Block, deleteBlock } from './useBlockStore';
import { handleModal } from "../../../stores/modalStore";
// import isEqual from 'lodash/isEqual';

// import "./styles.css";
// 
const useBlockEditor = (block: Block = null) => {

  const updateBlock = useBlockStore(state => state.updateBlock)

  const debouncedUpdateBlock = useDebouncedCallback((block) => {
    updateBlock(block);
  }, 300)

  return {
    debouncedUpdateBlock,
  }
};

export default useBlockEditor
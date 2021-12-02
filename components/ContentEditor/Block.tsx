import React, { useEffect, useRef } from 'react';
import BlockTypes from './BlockTypes';
import styles from '../dnd-kit/Container/Container.module.scss';

export const Block = ({ dragOverlay = false, block, onUpdateBlock }) => {
  
  console.log('block')
  console.log(block)
  
  const { id, type } = block
  const BlockComponent = BlockTypes.find(t => t.name === type).component

  // create seperate ID for drag overlays
  const blockId = dragOverlay ? `${dragOverlay}-${id}` : id;
  return (
    // <div className="p-2 mb-4 bg-white rounded-lg shadow shadow-lg">
    <div className="p-2">
      <BlockComponent id={blockId} block={block} onUpdateBlock={onUpdateBlock} />
    </div>
  );
};

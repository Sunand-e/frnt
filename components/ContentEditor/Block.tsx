import React, { useEffect, useRef } from 'react';
import blocktypes from './blocktypes';
import styles from '../dnd-kit/Container/Container.module.scss';
import useBlockEditor from './useBlockEditor';

export const Block = ({ dragOverlay = false, block }) => {
  
  // console.log('block')
  // console.log(block)

  const { id, type } = block
  const BlockComponent = blocktypes[type]?.component

  // create seperate ID for drag overlays
  const blockId = dragOverlay ? `${dragOverlay}-${id}` : id;
  return (
    // <div className="p-2 mb-4 bg-white rounded-lg shadow shadow-lg">
    <div className="p-4 h-full w-full max-w-screen-lg hover:bg-opacity-5 hover:bg-main">
      { BlockComponent && <BlockComponent id={blockId} block={block} /> }
    </div>
  );
};

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Container, Section, Bar, Resizer } from 'react-simple-resizer';
import { Block } from '../../Block';
import BlockContainer from '../../BlockContainer';

export const ColumnsBlock = ({id, block}) => {

  return (
    <div className="flex">
      { 
        block.children?.map((childBlock, index, blocks) => (
          <Block block={childBlock} key={childBlock.id} />
        ))
      }
    </div>
  )
}

export default ColumnsBlock
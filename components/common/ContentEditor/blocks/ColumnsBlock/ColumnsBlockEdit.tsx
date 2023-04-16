import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Container, Section, Bar, Resizer } from 'react-simple-resizer';
import BlockContainer from '../../BlockContainer';
import useBlockEditor from '../../useBlockEditor';

export const ColumnsBlockEdit = ({id, block}) => {

  const [widths,setWidths] = useState(block.widths)

  const { updateBlock } = useBlockEditor(block)

  const containerRef = useRef<any>()
  
  const columns = block.children?.map((childBlock, index) => (
    <div key={childBlock.id}>
      <BlockContainer
        isColumn={true} 
        id={childBlock.id}
        // block={{
        //   ...childBlock,
        //   parent: id
        // }}
      />
    </div>
  ))
  let gridColsClass
  
  switch(block.children.length) {
    case 1: gridColsClass = 'grid-cols-1'; break;
    case 2: gridColsClass = 'grid-cols-2'; break;
    case 3: gridColsClass = 'grid-cols-3'; break;
    case 4: gridColsClass = 'grid-cols-4'; break;
  }

  return (
    <div className={`w-full grid ${gridColsClass}`}>
      { columns }
    </div>
  );
}

export default ColumnsBlockEdit
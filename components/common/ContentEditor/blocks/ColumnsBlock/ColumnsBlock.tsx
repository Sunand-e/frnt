import { Container, Section, Bar, Resizer } from 'react-simple-resizer';
import { Block } from '../../Block';

export const ColumnsBlock = ({id, block}) => {

  let gridColsClass
  
  switch(block.children.length) {
    case 1: gridColsClass = 'grid-cols-1'; break;
    case 2: gridColsClass = 'grid-cols-2'; break;
    case 3: gridColsClass = 'grid-cols-3'; break;
    case 4: gridColsClass = 'grid-cols-4'; break;
  }

  return (
    <div className={`w-full grid ${gridColsClass}`}>
      { 
        block.children?.map((childBlock, index, blocks) => (
          <div 
            className='flex-1 relative px-4'
            style={{
              backgroundColor: childBlock?.properties?.bgColor,
              color: childBlock?.properties?.textColor || 'inherit'
            }}
            key={childBlock.id}
          >
            <Block block={childBlock} />
          </div>

        ))
      }
    </div>
  )
}

export default ColumnsBlock
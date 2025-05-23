import { Container, Section, Bar, Resizer } from 'react-simple-resizer';
import { Block } from '../../Block';

export const ColumnsBlock = ({id, block}) => {

  const gridTemplateColumns = block.widths.map(width => `${width}fr`).join(' ')

  return (
    <div className="grid" style={{
      gridTemplateColumns
    }}>
      { 
        block.children?.map((childBlock, index, blocks) => (
          <div className='flex-1' key={childBlock.id}>
            <Block block={childBlock} />
          </div>

        ))
      }
    </div>
  )
}

export default ColumnsBlock
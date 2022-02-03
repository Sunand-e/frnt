import { Block } from '../../Block';

const ColumnsBlockView = ({id, block}) => {

  return (
    <div className="flex">
      { 
        block.children?.map((childBlock) => (
          <Block block={childBlock} editing={false} key={childBlock.id} />
        ))
      }
    </div>
  )
}

export default ColumnsBlockView
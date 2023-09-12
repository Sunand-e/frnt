import { Resizable } from 're-resizable';
import { useEffect, useState } from 'react';
import classNames from '../../../../../utils/classNames';
import { getIndexAndParent, useBlockStore } from '../../useBlockStore';
import { ResizeableHandle } from './ResizeableHandle';

export const ResizeableElement = ({block, defaultWidth = '50%', children}) => {

  const isActive = useBlockStore(state => state.activeBlockId === block.id)
  // const isActive = activeBlockId === block.id

  const align = 'center'
  const handleElementClasses = classNames(
    'flex flex-col justify-center',
    'absolute select-none',
    'w-6 h-full top-0 z-10',
    isActive ? 'opacity-100' : 'opacity-0',
    'group-hover:opacity-100'
  )

  const handleAfterClasses = classNames(
    'after:flex',
    'after:w-2',
    'after:h-24',
    'after:shadow-lg',
    'after:rounded',
    'after:bg-gray-400',
    'group-hover/handle:after:bg-white ',
    
  )
  const handleClasses = `${handleElementClasses} ${handleAfterClasses}`

  const [width, setWidth] = useState( block.style?.width || defaultWidth || 0)
  // const  [width, setWidth] = useState(0)
  const updateBlock = useBlockStore(state => state.updateBlock)
  const { index, parent } = getIndexAndParent(block.id)

  const isColumn = parent?.type === 'columns'
  if(isColumn) {
      // console.log(parent.widths[index])
  }
  
  useEffect(() => {
    setWidth(block.style.width)
  }, [block.style.width])

  const handleResize = (e, direction, ref) => {
    const width = ref.offsetWidth
    setWidth(width)
    const updatedBlock = {
      ...block,
      style: {
        ...block.style,
        width: width
      }
    }
    updateBlock(updatedBlock)
  }
  
  // Determine the max width depending on if it is a column or not
  let maxWidth = '100%'
  // if(parent) {
  //   const widthUnits = parent.widths?.[index] || 12 / parent.children.length
  //   maxWidth = (((1024 / 12) * widthUnits) - 32)
  // }
  
  // alert(JSON.stringify(parent,null,2))
  return (
    <div
      className={``}
    >
        <figure
          className={`group m-0 relative`}
        >
          <Resizable
            // @ts-ignore
            className={`mx-auto min-w-[100px] group/handle`}
            size={{
              width: isNaN(width) ? width : (width + 'px'),
              height: '100%'
            }}
            // maxWidth="100%"
            maxWidth={ maxWidth }
            lockAspectRatio
            resizeRatio={align === 'center' ? 2 : 1}
            enable={{
              left: ['center', 'left'].includes(align),
              right: ['center', 'right'].includes(align),
            }}
            handleComponent={{
              left: (
                <ResizeableHandle
                  className={`${handleClasses} left-3 -ml-3 pl-3`}
                />
              ),
              right: (
                <ResizeableHandle
                  className={`${handleClasses} items-end right-3 -mr-3 pr-3`}
                />
              ),
            }}
            handleStyles={{
              left: { left: 0 },
              right: { right: 0 },
            }}
            onResize={(e, direction, ref) => {
              // useBlockStore.setState({
              //   activeBlockId: block.id
              // })
            }}
            onResizeStop={handleResize}
          >
            { children }
          </Resizable>

        </figure>
    </div>
  );
}

export default ResizeableElement
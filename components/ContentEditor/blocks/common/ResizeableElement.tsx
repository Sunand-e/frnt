import { Resizable } from 're-resizable';
import { ResizeableHandle } from './ResizeableHandle'
import { activeContentBlockVar } from '../../../../graphql/cache';
import useBlockEditor from '../../useBlockEditor';
import { useEffect, useState } from 'react';

export const ResizeableElement = ({block, defaultWidth, children}) => {

  const align = 'center'
  const handleElementClasses = `flex flex-col justify-center absolute select-none w-6 h-full top-0 z-10 opacity-0 group-hover:opacity-100 `
  const handleAfterClasses = `after:flex after:bg-gray-400 after:w-2 after:h-24 after:rounded`
  const handleClasses = `${handleElementClasses} ${handleAfterClasses}`

  const [width, setWidth] = useState( block.properties.width || defaultWidth || 0)
  // const  [width, setWidth] = useState(0)
  const { updateBlock, addBlock } = useBlockEditor(block)

  useEffect(() => {
    const updatedBlock = {
      ...block,
      properties: {
        ...block.properties,
        width: width + 'px'
      }
    }
    updateBlock(updatedBlock)
  }, [width]);

  return (
    <div
      className={``}
    >
        <figure
          className={`group m-0 relative`}
          
        >
          <Resizable
            // @ts-ignore
            className={`mx-auto`}
            size={{
              width: width,
              height: '100%'
            }}
            maxWidth="100%"
            lockAspectRatio
            resizeRatio={align === 'center' ? 2 : 1}
            enable={{
              left: ['center', 'left'].includes(align),
              right: ['center', 'right'].includes(align),
            }}
            handleComponent={{
              left: (
                <ResizeableHandle
                  className={`${handleClasses} -left-3 -ml-3 pl-3`}
                />
              ),
              right: (
                <ResizeableHandle
                  className={`${handleClasses} items-end -right-3 -mr-3 pr-3`}
                />
              ),
            }}
            handleStyles={{
              left: { left: 0 },
              right: { right: 0 },
            }}
            onResize={(e, direction, ref) => {
              activeContentBlockVar(block.id)
            }}
            onResizeStop={(e, direction, ref) => {
              setWidth(ref.offsetWidth)
            }}
          >
            { children }
          </Resizable>

        </figure>
    </div>
  );
}

export default ResizeableElement
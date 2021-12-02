import {
  useEffect,
  useState,
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import dynamic from 'next/dynamic';

const DynamicPackageIFrame = dynamic(
  () => import('./PackageIFrame'),
  { ssr: false }
)

export const PackageBlock = ({id, block, onUpdateBlock: updateBlock}) => {
  const { properties } = block

  const  defaultWidth = '100%';

  const  [width, setWidth] = useState( properties.width || 0)

  useEffect(() => {
    const updatedBlock = {
      ...block,
      properties: {
        ...properties,
        width
      }
    }
    updateBlock(updatedBlock)
  }, [width]);

  return (
    <ResizeableElement
      id={id}
      width={width === 0 ? defaultWidth : width + 'px'}
      onResizeStop={setWidth}
    >
      <div className="aspect-w-16 aspect-h-9 px-1">
        <DynamicPackageIFrame properties={properties}/>
      </div>
    </ResizeableElement>
  );
}

export default PackageBlock
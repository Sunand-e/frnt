import {
  useEffect,
  useState,
  FunctionComponent
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import dynamic from 'next/dynamic';
import useBlockEditor from '../../useBlockEditor';

const DynamicPackageIFrame = dynamic(
  () => import('./PackageIFrame'),
  { ssr: false }
)

export const PackageBlock: FunctionComponent = ({block}) => {

  const { properties } = block
  const { updateBlock } = useBlockEditor()
  const  defaultWidth = '100%';

  const  [width, setWidth] = useState( block.properties?.width || 0)

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
    // <DynamicPackageIFrame block={block}/>
    <ResizeableElement
      id={block.id}
      width={width === 0 ? defaultWidth : width + 'px'}
      onResizeStop={setWidth}
    >
      <div className="aspect-w-16 aspect-h-9 px-1">
        <DynamicPackageIFrame block={block}/>
      </div>
    </ResizeableElement>
  );
}

export default PackageBlock
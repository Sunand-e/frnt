import {
  FunctionComponent
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import dynamic from 'next/dynamic';

const DynamicPackageIFrame = dynamic(
  () => import('./PackageIFrame'),
  { ssr: false }
)

export const PackageBlock: FunctionComponent = ({block}) => {

  const  defaultWidth = '100%';

  return (
    <div className="aspect-w-16 aspect-h-9 px-1">
      <DynamicPackageIFrame block={block}/>
    </div>
  );
}

export default PackageBlock
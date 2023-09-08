import {
  FunctionComponent
} from 'react';
import { closeModal } from '../../../../../stores/modalStore';
import classNames from '../../../../../utils/classNames';
import { ConditionalWrapper } from '../../../ConditionalWrapper';
import ImageSelectFromLibrary from '../../ImageSelectFromLibrary';
import { getIndexAndParent, updateBlockProperties } from '../../useBlockStore';
import ResizeableElement from '../common/ResizeableElement';

export const ImageBlockEdit: FunctionComponent = ({block}) => {

  const { parent } = getIndexAndParent(block.id)

  const selectImage = (image) => {
    updateBlockProperties(block, {
      url: image?.location,
      mediaId: image?.id
    })
    closeModal()
  }

  let imageSize = 'default'
  if(parent?.type === 'columns') {
    imageSize = 'fullwidth'
  } else {
    imageSize = block.imageSize
  }

  const  defaultWidth = '50%';
  return (
    <ConditionalWrapper
      condition={block.imageSize !== 'custom'}
      wrapper={children => (
        <div className='flex justify-center'>{children}</div>
      )}
    >
      <ConditionalWrapper
        condition={block.imageSize === 'custom'}
        wrapper={children => (
          <ResizeableElement
            block={block}
            defaultWidth={defaultWidth}
          >
            {children}
          </ResizeableElement>
        
        )}
      >
        <ImageSelectFromLibrary
          src={block.properties?.url}
          onSelect={selectImage}
          className={classNames(
            // NO CLASSNAME IF CUSTOM SIZED
            block.imageSize === 'fullwidth' && 'max-h-[30rem] h-[30rem]',
            (block.imageSize === 'default' || block.imageSize === undefined) ? 'max-w-[50%]' : 'w-full'
          )}
        />
      </ConditionalWrapper>
    </ConditionalWrapper>
    
  );
}

export default ImageBlockEdit
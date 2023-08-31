import {
  FunctionComponent, useContext,
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import useBlockEditor from '../../useBlockEditor';
import { v4 as uuidv4 } from 'uuid';
import ImageSelectFromLibrary from '../../ImageSelectFromLibrary';
import { closeModal } from '../../../../../stores/modalStore';
import classNames from '../../../../../utils/classNames';
import { getIndexAndParent } from '../../useBlockStore';
import { ConditionalWrapper } from '../../../ConditionalWrapper';

export const ImageBlockEdit: FunctionComponent = ({block}) => {

  const { updateBlockProperties } = useBlockEditor()

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
            block.imageSize === 'fullwidth' && 'h-full max-h-[30rem]',
            (block.imageSize === 'default' || block.imageSize === undefined) ? 'max-w-[50%]' : 'w-full'
          )}
        />
      </ConditionalWrapper>
    </ConditionalWrapper>
    
  );
}

export default ImageBlockEdit
import { Editable, EditableArea, EditableInput, EditablePreview } from '@ark-ui/react';
import {
  FunctionComponent, useCallback, useState
} from 'react';
import { closeModal } from '../../../../../stores/modalStore';
import classNames from '../../../../../utils/classNames';
import { ConditionalWrapper } from '../../../ConditionalWrapper';
import ImageSelectFromLibrary from '../../ImageSelectFromLibrary';
import useBlockEditor from '../../useBlockEditor';
import { getIndexAndParent, updateBlockProperties, useBlockStore } from '../../useBlockStore';
import ResizeableElement from '../common/ResizeableElement';

export const ImageBlockEdit: FunctionComponent = ({block}) => {

  const { parent } = getIndexAndParent(block.id)
  const isChild = useBlockStore(state => !state.blocks.some(b => b.id === block.id))

  const {debouncedUpdateBlock} = useBlockEditor()
  const [captionText, setCaptionText] = useState(block.properties?.captionText)

  const onChangeCaption = useCallback((value) => {
    setCaptionText(value)
    const updatedBlock = {
      ...block,
      properties: {
        ...block.properties,
        captionText: value
      }
    }
    debouncedUpdateBlock(updatedBlock)
  },[block, debouncedUpdateBlock])
  
  const selectImage = (image) => {
    updateBlockProperties(block, {
      url: image?.location,
      mediaId: image?.id
    })
    closeModal()
  }

  const  defaultWidth = '50%';
  
  let imageClasses = ''
  if(parent?.type === 'columns') {
    imageClasses += 'w-full'
  } else {
    if(block.imageSize === 'fullwidth') {
      imageClasses += 'max-h-[30rem] h-[30rem]'
    }
    if(block.imageSize === 'default' || block.imageSize === undefined) {
      imageClasses += 'max-w-[50%]'
    } else {
      imageClasses += 'w-full'
    }
  }
  
  return (
    <>
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
              imageClasses
            )}
          />
        </ConditionalWrapper>
      </ConditionalWrapper>
      { block.properties?.showCaption && (
        <Editable
          onClick={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.preventDefault()}
          value={captionText || ''}
          placeholder={`Enter caption here`}
          onChange={({value}) => onChangeCaption(value)}
          autoResize={true}
          className={'text-sm block text-center text-gray-500'}
          selectOnFocus={false}
        >
          <EditableArea>
            <EditableInput className="w-full p-3"/>
            <EditablePreview className="w-full p-3"/>
          </EditableArea>
        </Editable>
      )}
    </>
  );
}

export default ImageBlockEdit
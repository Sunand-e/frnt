import { FunctionComponent, useCallback } from 'react';
import { useBlockStore } from '../../useBlockStore';
import Link from './Link';
import useBlockEditor from '../../useBlockEditor';

interface LinkBlockEditProps {
  id: string;
}

export const LinkBlockEdit: FunctionComponent<LinkBlockEditProps> = ({ id }) => {
  const block = useBlockStore(state => state.computed.getBlock(id));

  const { properties } = block

  const { debouncedUpdateBlock } = useBlockEditor()

  const blockRef = useBlockStore(state => state.blockRefs.get(id))
  const zIndex = useBlockStore(state => state.zIndexes.get(id))

  const handleHeadingChange = useCallback((newValue :any) => {
    const updatedBlock = {
      ...block,
      properties: {
        ...block.properties,
        content: {
          ...block.properties.content,
          heading_content: newValue
        }
      }
    }
    debouncedUpdateBlock(updatedBlock)
  },[block, debouncedUpdateBlock])

  const handleDescChange = useCallback((newValue :any) => {
    const updatedBlock = {
      ...block,
      properties: {
        ...block.properties,
        content: {
          ...block.properties.content,
          description_content: newValue
        }
      }
    }
    debouncedUpdateBlock(updatedBlock)
  },[block, debouncedUpdateBlock])

  const onMenuShow = useCallback((instance: any) => {
    if(blockRef) {
      blockRef.style.zIndex = '99999'
    }
  },[blockRef])

  const onMenuHidden = useCallback((instance: any) => {
    if(blockRef) {
      blockRef.style.zIndex = zIndex
    }
  },[blockRef])
 
  return (
    <Link
      buttonText={properties?.buttonText}
      url={properties?.url }
      onUpdateHeading={handleHeadingChange}
      onUpdateDesc={handleDescChange}
      onMenuShow={onMenuShow}
      onMenuHidden={onMenuHidden}
      content={properties?.content}
    />
  );
}

export default LinkBlockEdit;

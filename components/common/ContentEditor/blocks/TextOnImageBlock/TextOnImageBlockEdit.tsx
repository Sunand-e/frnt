import { useEffect } from 'react';

import Editor from '../../../inputs/Editor';
import useBlockEditor from '../../useBlockEditor';
import { useBlockStore } from '../../useBlockStore';

export const TextOnImageBlockEdit = ({id}) => {
  // const block = useBlockStore(state => state.getBlock(id))
  const block = useBlockStore(state => state.computed.getBlock(id))
  
  const { debouncedUpdateBlock } = useBlockEditor()

  const handleContentChange = (newValue) => {
    debouncedUpdateBlock({
      ...block,
      content: newValue
    })
  }

  useEffect(() => {
    !block.content && setTimeout(focus, 10);
  },[])

  return (
    <div className='min-h-[240px] flex items-center'>
      <Editor
        onUpdate={handleContentChange}
        isHeading={true}
        editorClass={'prose-white'} 
        content={block.content}
        autofocus={false}
      />
    </div>
  );
}

export default TextOnImageBlockEdit
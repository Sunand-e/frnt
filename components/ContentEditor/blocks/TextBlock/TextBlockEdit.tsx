
import React, { useMemo, FunctionComponent, useEffect } from 'react';
import {
  createPlugins,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createHeadingPlugin,
  createItalicPlugin,
  createParagraphPlugin,
  createPlateUI,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createAlignPlugin,
  getPlateEditorRef
} from '@udecode/plate';
import { Plate, PlateRenderElementProps } from '@udecode/plate-core';

import { CONFIG } from './config';

import useBlockEditor from '../../useBlockEditor';
import Button from '../../../Button';
import { ReactEditor } from 'slate-react';
import { SelectionToolbar } from './SelectionToolbar';
import { Editor, Transforms } from 'slate';

const elements = createPlugins(
  [
    createParagraphPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHeadingPlugin(),
    createAlignPlugin(CONFIG.align),
  ],
  {
    components: createPlateUI(),
  }
);

const marks = createPlugins(
  [
    createBoldPlugin(),
    createCodePlugin(),
    createItalicPlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createUnderlinePlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
  ],
  {
    components: createPlateUI(),
  }
);

export const TextBlockEdit: FunctionComponent = ({block}: PlateRenderElementProps) => {
  const { properties } = block

  const { debouncedUpdateBlock } = useBlockEditor()

  const handleChange = (newValue) => {
    document.querySelector('#debug_panel').innerHTML = '<pre>'+JSON.stringify(newValue,null,2)+'</pre>'
    const updatedBlock = {
      ...block,
      properties: {
        ...block.properties,
        content: newValue
      }
    }
    debouncedUpdateBlock(updatedBlock)// return false
  }
  
  const plugins = useMemo(
    () => createPlugins([...elements, ...marks], {
      components: createPlateUI(),
    }), []
  )

  useEffect(() => {
    !properties?.content && setTimeout(focus, 0);
  },[])

  const focus = () => {
    const editor = getPlateEditorRef(block.id)
    Transforms.select(editor, Editor.end(editor, []));
    ReactEditor.focus(editor);
  }

  return (
    <>
      <Plate
        id={block.id}
        plugins={plugins}
        editableProps={CONFIG.editableProps}
        onChange={handleChange}
        initialValue={properties?.content || [{type: 'p', children: [{text:''}]}]}
      >
        <SelectionToolbar />
      </Plate>
    </>
  );
}

export default TextBlockEdit

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
  createAlignPlugin
} from '@udecode/plate';
import { Plate, PlateRenderElementProps, usePlateEditorState } from '@udecode/plate-core';

import { CONFIG } from './config';

import useBlockEditor from '../../useBlockEditor';
import Button from '../../../Button';
import { ReactEditor } from 'slate-react';
import { SelectionToolbar } from './SelectionToolbar';

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

  const editor = usePlateEditorState(block.id);

  useEffect(() => {
    if (editor) {
      setTimeout(() => {
        console.log('block.id')
        console.log(block.id)
        ReactEditor.focus(editor);
      }, 510);
    }
  }, []);

  // const focusEditor = () => {
  //     setTimeout(() => {
  //       ReactEditor.focus(editor);
  //     }, 1000);
  // }

  return (
    <>
    {/* <Button onClick={focusEditor}>SS</Button> */}
    <pre>
      {/* { JSON.stringify(editor,null,2) }? */}
    </pre>
      <Plate
        id={block.id}
        plugins={plugins}
        editableProps={CONFIG.editableProps}
        // editor={editor}
        onChange={handleChange}
        initialValue={properties?.content || [{type: 'p', children: [{text:''}]}]}
      >
        <SelectionToolbar />
      </Plate>
    </>
  );
}

export default TextBlockEdit
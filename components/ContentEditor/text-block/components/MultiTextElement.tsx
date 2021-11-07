import React, { useContext, useMemo, useState } from 'react';
import {
  createBasicElementPlugins,
  createHistoryPlugin,
  createReactPlugin,
  createDndPlugin,
  createPlateComponents,
  createPlateOptions,
} from '@udecode/plate';

import { 
  createBoldPlugin, 
  createCodePlugin, 
  createItalicPlugin, 
  createStrikethroughPlugin, 
  createUnderlinePlugin, 
  MARK_BOLD, 
  MARK_ITALIC, 
  MARK_UNDERLINE
} from "@udecode/plate-basic-marks";

import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from '@udecode/plate-break';
import { Plate, SPRenderElementProps, usePlateStore, useStoreEditorState } from '@udecode/plate-core';
import { createResetNodePlugin } from '@udecode/plate-reset-node';
import { CONFIG } from '../../config/config';
import { VALUES } from '../../config/values/values';
import { v4 as uuidv4 } from 'uuid';
// import { ContentContext } from '../../../../context/contentContext';
import { HeadingToolbar } from '@udecode/plate-toolbar';
import { Toolbar } from './Toolbar';
import { Transforms } from 'slate';
export const MultiTextElement = ({
  element,
  attributes,
  children,
}: SPRenderElementProps) => {
    
  const plugins = [
    // editor
    createReactPlugin(),          // withReact
    createHistoryPlugin(),        // withHistory

    // elements
    ...createBasicElementPlugins(),

    // marks
    createBoldPlugin(),           // bold mark
    createItalicPlugin(),         // italic mark
    createUnderlinePlugin(),      // underline mark
    createStrikethroughPlugin(),  // strikethrough mark
    createCodePlugin(),           // code mark
  ];

  const pluginsMemo: PlatePlugin<TEditor>[] = useMemo(() => {  
    return plugins
  }, [])

  // const {content, setContent} = useContext(ContentContext)
  // const [debugVal, setDebugVal] = useState(content)
  
  //debug
  const store = usePlateStore();
  const editor = useStoreEditorState();

  const handleChange = (newValue) => {
    console.log(editor)
    console.log('setnodes newValue')
    console.log(newValue)
    const elIndex = editor.children.findIndex(el => el.id === element.id)
    console.log('elIndex')
    console.log(elIndex)
    Transforms.setNodes(editor, {children: newValue}, {
      at: [elIndex]
    })
    // Transforms.setNodes(editor, {children: newValue}, {
    //   at: [elIndex]
    // })
    
    // setDebugVal(newValue)

    // setContent(content => {
    //   const elIndex = content.findIndex(
    //     (el) => el.id === element.id
    //   )
    //   return [...content.slice(0,elIndex), {...content[elIndex], children:newValue }, ...content.slice(elIndex + 1)];
    // })
  }

  return (
    // Need contentEditable=false or Firefox has issues with certain input types.
    <div {...attributes} contentEditable={false}>
      <div style={{ padding: '20px', border: '2px solid #ddd' }}>
        <Plate
          id={element.id}
          plugins={pluginsMemo}
          components={createPlateComponents()}
          options={createPlateOptions()}
          editableProps={CONFIG.editableProps}
          onChange={handleChange}
          initialValue={element.children || [{children: [{text:''}]}]}
        >
        {/* <HeadingToolbar>
          <Toolbar />
        </HeadingToolbar> */}
      </Plate>
      </div>
      {children}
    </div>
  );
};
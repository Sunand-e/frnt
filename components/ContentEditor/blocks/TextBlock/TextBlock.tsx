
import React, { useMemo, useState, FunctionComponent } from 'react';
import {
  createBasicElementPlugins,
  createHistoryPlugin,
  createReactPlugin,
  createPlateComponents,
  createPlateOptions,
  createAlignPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  PlatePlugin,
  TEditor,
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
} from '@udecode/plate';

import { 
  createBoldPlugin, 
  createCodePlugin, 
  createItalicPlugin, 
  createStrikethroughPlugin, 
  createUnderlinePlugin, 
} from "@udecode/plate-basic-marks";
import { Plate, PlateRenderElementProps, usePlateStore, usePlateEditorState, usePlateEventId } from '@udecode/plate-core';

import { CONFIG } from './config';

import useBlockEditor from '../../useBlockEditor';

export const TextBlock: FunctionComponent = ({block}: PlateRenderElementProps) => {
  const { properties } = block

  const { debouncedUpdateBlock } = useBlockEditor()

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
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),

    
    // createAlignPlugin(),
    createAlignPlugin({
      validTypes: [
        ELEMENT_PARAGRAPH,
        ELEMENT_H1,
        ELEMENT_H2,
        ELEMENT_H3,
        ELEMENT_H4,
        ELEMENT_H5,
        ELEMENT_H6,
      ],
    })

  ];

  const pluginsMemo: PlatePlugin<TEditor>[] = useMemo(() => {  
    return plugins
  }, [])

  // const {content, setContent} = useContext(ContentContext)
  const [debugVal, setDebugVal] = useState([])
  
  const handleChange = (newValue) => {
    const updatedBlock = {
      ...block,
      properties: {
        ...block.properties,
        content: newValue
      }
    }
    debouncedUpdateBlock(updatedBlock)// return false
  }

  // console.log('text block rerendered')
  // console.log(properties?.content)
  return (
    <Plate
      id={block.id}
      plugins={pluginsMemo}
      components={createPlateComponents()}
      options={createPlateOptions()}
      editableProps={CONFIG.editableProps}
      onChange={handleChange}
      initialValue={properties?.content || [{children: [{text:''}]}]}
    >

    </Plate>
  );
}

export default TextBlock
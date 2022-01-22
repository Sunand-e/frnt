
import React, { useMemo, FunctionComponent } from 'react';
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
import { Plate, PlateRenderElementProps } from '@udecode/plate-core';

import { CONFIG } from './config';

import useBlockEditor from '../../useBlockEditor';

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

export const TextBlock: FunctionComponent = ({block}: PlateRenderElementProps) => {
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

  return (
    <>
      <Plate
        id={block.id}
        plugins={createPlugins([...elements, ...marks], {
          components: createPlateUI(),
        })}
        editableProps={CONFIG.editableProps}
        onChange={handleChange}
        initialValue={properties?.content || [{type: 'p', children: [{text:''}]}]}
      />
    </>
  );
}

export default TextBlock
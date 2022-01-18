
import React, { useMemo, FunctionComponent } from 'react';
import {
  createPlugins,
  PlatePlugin,
  TEditor,
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
} from '@udecode/plate';
import { Plate, PlateRenderElementProps } from '@udecode/plate-core';

import { CONFIG } from './config';

import useBlockEditor from '../../useBlockEditor';

const basicElements = createPlugins(
  [
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHeadingPlugin(),
    createParagraphPlugin(),
  ],
  {
    components: createPlateUI(),
  }
);

const basicMarks = createPlugins(
  [
    createBoldPlugin(),
    createCodePlugin(),
    createItalicPlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createUnderlinePlugin(),
  ],
  {
    components: createPlateUI(),
  }
);

export const TextBlock: FunctionComponent = ({block}: PlateRenderElementProps) => {
  const { properties } = block

  const { debouncedUpdateBlock } = useBlockEditor()

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

  return (
    <>
      <Plate
        id={block.id}
        plugins={createPlugins([...basicElements, ...basicMarks], {
          components: createPlateUI(),
        })}
        editableProps={CONFIG.editableProps}
        onChange={handleChange}
        initialValue={properties?.content || [{children: [{text:''}]}]}
      />
    </>
  );
}

export default TextBlock
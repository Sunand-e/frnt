
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

  const plugins = useMemo(
    () => createPlugins([...elements, ...marks], {
      components: createPlateUI(),
    }), []
  )

  return (
    <>
      <Plate
        id={block.id}
        plugins={plugins}
        editableProps={{readOnly:true}}
        initialValue={properties?.content || [{type: 'p', children: [{text:''}]}]}
      />
    </>
  );
}

export default TextBlock
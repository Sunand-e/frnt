import React, { useState } from 'react';
import {
  createBasicElementPlugins,
  createHistoryPlugin,
  createReactPlugin,
  createDndPlugin,
} from '@udecode/plate';
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from '@udecode/plate-break';
import { Plate, PlateRenderElementProps } from '@udecode/plate-core';
import { createResetNodePlugin } from '@udecode/plate-reset-node';
import { CONFIG } from '../../config/config';
import { VALUES } from '../../config/values/values';
import { v4 as uuidv4 } from 'uuid';
const plugins = [
  createReactPlugin(),
  createHistoryPlugin(),
  ...createBasicElementPlugins(),
];

export const TextBlockElement = ({
  element,
  attributes,
  children,
}: PlateRenderElementProps) => {
  const [inputValue, setInputValue] = useState('');
  console.log('attributes')
  console.log(attributes)
  return (
    // Need contentEditable=false or Firefox has issues with certain input types.
    <div {...attributes}>
      <div style={{ padding: '20px', border: '2px solid #ddd' }}>
p        <Plate
          id={element.id}
          plugins={plugins}
          // components={CONFIG.components}
          // options={CONFIG.options}
          editableProps={CONFIG.editableProps}
          // initialValue={element.children}
        />
      </div>
      {children}
    </div>
  );
};
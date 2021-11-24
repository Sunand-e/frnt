
import React, { useMemo, useState } from 'react';
import {
  createImagePlugin,
  createParagraphPlugin,
  createPlateComponents,
  createPlateOptions,
  PlatePlugin,
  TEditor,
} from '@udecode/plate';

import { Plate, PlateRenderElementProps } from '@udecode/plate-core';

import { CONFIG } from '../../config/config';
import { VALUES } from '../../config/values/values';

export const ImageBlock = ({id, block, onUpdateBlock: updateBlock}: PlateRenderElementProps) => {
  const { properties } = block
  const plugins = [
    createParagraphPlugin(),      // paragraph element
    createImagePlugin(),
  ];

  const pluginsMemo: PlatePlugin<TEditor>[] = useMemo(() => {  
    return plugins
  }, [])

  // const {content, setContent} = useContext(ContentContext)
  const [debugVal, setDebugVal] = useState([])
  
  // const handleChange = (newValue) => {
  //   const updatedBlock = {
  //     ...block,
  //     properties: {
  //       ...block.properties,
  //       content: newValue
  //     }
  //   }
  //   updateBlock(updatedBlock)// return false
  // }

  return (
    <Plate
      id={id}
      plugins={pluginsMemo}
      components={createPlateComponents()}
      options={createPlateOptions()}
      editableProps={CONFIG.editableProps}
      // onChange={handleChange}
      initialValue={properties?.content || VALUES.image}
      // initialValue={properties?.content || VALUES.image}
    >

    </Plate>
  );
}

export default ImageBlock
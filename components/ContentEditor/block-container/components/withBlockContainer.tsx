import React, { forwardRef } from 'react';
import { createNodesWithHOC } from '@udecode/plate-common';
import {
  PlateRenderElementProps,
} from '@udecode/plate-core';
import { BlockContainer } from './BlockContainer';



export const withBlockContainer = (
  Component: any
) => {
  return forwardRef((props: PlateRenderElementProps, ref) => {
    const { attributes, element } = props;

    return (
      <BlockContainer
        attributes={attributes}
        element={element}
        componentRef={ref}
      >
        <Component {...props} />
      </BlockContainer>
    );
  });
};

export const withBlockContainers = createNodesWithHOC(withBlockContainer);

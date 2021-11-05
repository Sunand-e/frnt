import React, { useRef } from 'react';
import { BlockContainerProps } from './BlockContainer.types';

export const BlockContainer = (props: BlockContainerProps) => {
  const { children, element, componentRef } = props;

  return (
    <div className="p-2 mb-4 bg-white rounded-lg shadow shadow-lg">
      {children}
    </div>
  );
};

import { PlatePlugin } from '@udecode/plate-core';

export const createBlockContainerPlugin = (): PlatePlugin => ({
  onDrop: (editor) => () => editor.isDragging,
});

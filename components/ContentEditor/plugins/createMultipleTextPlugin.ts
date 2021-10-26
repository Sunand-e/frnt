import {
  getPlatePluginTypes,
  getRenderElement,
  PlatePlugin,
} from '@udecode/plate';

export const createMultipleTextPlugin = (): PlatePlugin => ({
  renderElement: getRenderElement('multiple-text'),
  voidTypes: getPlatePluginTypes('multiple-text'),
});
import {
  getPlatePluginTypes,
  getRenderElement,
  PlatePlugin,
} from '@udecode/plate';

// export const createTextBlockPlugin = (): PlatePlugin => ({
//   renderElement: getRenderElement('multi-text'),
//   voidTypes: getPlatePluginTypes('multi-text'),
// });


import { getTextBlockDeserialize } from './getTextBlockDeserialize';
export const createTextBlockPlugin = ({
  pluginKey = 'text-block'
}: {
  pluginKey?: string;
} = {}): PlatePlugin => ({
  pluginKeys: pluginKey,
  renderElement: getRenderElement(pluginKey),
  deserialize: getTextBlockDeserialize(pluginKey),
  // voidTypes: getPlatePluginTypes(pluginKey),
});
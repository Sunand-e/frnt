import {
  getPlatePluginTypes,
  getRenderElement,
  PlatePlugin,
} from '@udecode/plate';

// export const createMultiTextPlugin = (): PlatePlugin => ({
//   renderElement: getRenderElement('multi-text'),
//   voidTypes: getPlatePluginTypes('multi-text'),
// });


import { getMultiTextDeserialize } from './getMultiTextDeserialize';
export const createMultiTextPlugin = ({
  pluginKey = 'multi-text'
}: {
  pluginKey?: string;
} = {}): PlatePlugin => ({
  pluginKeys: pluginKey,
  renderElement: getRenderElement(pluginKey),
  deserialize: getMultiTextDeserialize(pluginKey),
  voidTypes: getPlatePluginTypes(pluginKey),
});
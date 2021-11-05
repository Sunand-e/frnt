import { getNodeDeserializer } from '@udecode/plate-common';
import {
  Deserialize,
  getPlatePluginOptions,
  getSlateClass,
} from '@udecode/plate-core';

export const getMultiTextDeserialize = (
  pluginKey = 'multi-text'
): Deserialize => (editor) => {
  const options = getPlatePluginOptions(editor, pluginKey);

  return {
    element: getNodeDeserializer({
      type: options.type,
      getNode: (el: HTMLElement) => {
        // let url = el.getAttribute('src');
        // if (url) {
        //   [url] = url.split('?');

          return {
            type: options.type,
            // ppo: 'aaaaaaaaa',
            // url,
          };
        // }
      },
      rules: [
        { nodeNames: 'P' },
        { className: getSlateClass(options.type) },
      ],
      ...options.deserialize,
    }),
  };
};
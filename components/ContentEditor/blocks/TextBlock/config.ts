
import { ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6, ELEMENT_PARAGRAPH, IndentPlugin } from '@udecode/plate'
import { PlatePlugin } from '@udecode/plate-core'
import { EditableProps } from 'slate-react/dist/components/editable'

export const CONFIG: {
  editableProps: EditableProps
  align: Partial<PlatePlugin>;
  indent: Partial<PlatePlugin<{}, IndentPlugin>>;
} = {
  editableProps: {
    // spellCheck: false,
    // autoFocus: false,
    placeholder: 'Type…',
    // style: {
    //   padding: '15px',
    // },
  },
  align: {
    inject: {
      props: {
        validTypes: [
          ELEMENT_PARAGRAPH,
          ELEMENT_H1,
          ELEMENT_H2,
          ELEMENT_H3,
          ELEMENT_H4,
          ELEMENT_H5,
          ELEMENT_H6,
        ],
      },
    },
  },
  indent: {
    inject: {
      props: {
        validTypes: [
          ELEMENT_PARAGRAPH,
          ELEMENT_H1,
          ELEMENT_H2,
          ELEMENT_H3,
          ELEMENT_H4,
          ELEMENT_H5,
          ELEMENT_H6,
          ELEMENT_BLOCKQUOTE,
          ELEMENT_CODE_BLOCK,
        ],
      },
    },
  },
}
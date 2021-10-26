import { createPlateComponents, createPlateOptions } from "@udecode/plate";
import { createBoldPlugin, createCodePlugin, createItalicPlugin, createStrikethroughPlugin, createUnderlinePlugin, MARK_BOLD, MARK_ITALIC, MARK_UNDERLINE } from "@udecode/plate-basic-marks";
import { createBlockquotePlugin, ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import { createCodeBlockPlugin, ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE } from "@udecode/plate-code-block";
import { createHistoryPlugin, createReactPlugin, Plate, useStoreEditorState } from "@udecode/plate-core";
import { createHeadingPlugin, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from "@udecode/plate-heading";
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { createEditor } from "@udecode/plate-test-utils";
import { useState } from "react";
import { Transforms } from "slate";
import { CONFIG } from "./config/config";
import { VALUES } from "./config/values/values";
import { createMultipleTextPlugin } from "./plugins/createMultipleTextPlugin";
import { MultipleTextElement } from "./plugins/MultipleTextElement";

const ContentEditor = ({content, onChange}) => {
  // Stored in PLUGINS.basicNodes
  const basicNodesPlugins = [
    // editor
    createReactPlugin(),          // withReact
    createHistoryPlugin(),        // withHistory

    // elements
    createParagraphPlugin(),      // paragraph element
    createBlockquotePlugin(),     // blockquote element
    createCodeBlockPlugin(),      // code block element
    createHeadingPlugin(),        // heading elements

    // marks
    createBoldPlugin(),           // bold mark
    createItalicPlugin(),         // italic mark
    createUnderlinePlugin(),      // underline mark
    createStrikethroughPlugin(),  // strikethrough mark
    createCodePlugin(),           // code mark
  ];

  // Quick helper to create a block element with (marked) text
  const createElement = (
    text = '',
    {
      type = ELEMENT_PARAGRAPH,
      mark,
    }: {
      type?: string;
      mark?: string;
    } = {}
  ) => {
    const leaf = { text }
    if(mark) {
      leaf[mark] = true
    }

    return {
      type,
      children: [leaf],
    }
  }

  const editableProps = {
    placeholder: 'Type…',
    style: {
      padding: '15px',
    },
  };

  const initialValue = [
    createElement('🧱 Elements', { type: ELEMENT_H1 }),
  ];
  
  const components = createPlateComponents();
  const options = createPlateOptions();

  const editor = useStoreEditorState();

  const [debugValue, setDebugValue] = useState(null);

  const handleButton = () => {

  }

  return (
    <>
    <button onClick={handleButton}>Editor state</button>
    <Plate
      // id="content-editor"
      plugins={basicNodesPlugins}
      components={components}
      options={options}
      editableProps={editableProps}
      initialValue={initialValue}
      onChange={(newValue) => setDebugValue(newValue)}
    />
    <pre>
      {JSON.stringify(debugValue, null, 2)}
    </pre>
    </>
  );
}

export default ContentEditor
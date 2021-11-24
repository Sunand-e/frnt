import { createPlateComponents, createDndPlugin, createNodeIdPlugin, createPlateOptions } from "@udecode/plate";
import { createBoldPlugin, createCodePlugin, createItalicPlugin, createStrikethroughPlugin, createUnderlinePlugin, MARK_BOLD, MARK_ITALIC, MARK_UNDERLINE } from "@udecode/plate-basic-marks";
import { createBlockquotePlugin, ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import { createCodeBlockPlugin, ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE } from "@udecode/plate-code-block";
import { createMediaEmbedPlugin } from "@udecode/plate-media-embed";
import { createHistoryPlugin, createReactPlugin, Plate, PlatePlugin, PlateEditor, useEventEditorStore, usePlateStore, usePlateEditorState, usePlateValue } from "@udecode/plate-core";
import { createHeadingPlugin, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from "@udecode/plate-heading";
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { HeadingToolbar } from '@udecode/plate-toolbar';
import { createSelectOnBackspacePlugin } from "@udecode/plate-select";
import { withDraggables } from "@udecode/plate-dnd";
import { createEditor } from "@udecode/plate-test-utils";
import { useContext, useEffect, useMemo, useState } from "react";
import { Transforms } from "slate";
import { CONFIG } from "./config/config";
import { VALUES } from "./config/values/values";
import { createMultiTextPlugin } from "./multi-text-element/createMultiTextPlugin";
import { MultiTextElement } from "./multi-text-element/components/MultiTextElement";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { withStyledDraggables } from "./config/withStyledDraggables";
import { withStyledBlockContainers } from "./config/withStyledBlockContainers";
// import { withStyledBlockContainers } from "./block-container/components/withStyledBlockContainers";
import { withBlockContainers } from "./block-container/components/withBlockContainer";
import ShowStore from "./ShowStore";
import { ContentContext, ContentContextProvider } from "../../context/contentContext"
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import { useDebouncedCallback } from 'use-debounce';
import { Toolbar } from "./blocks/TextBlock/Toolbar";
// import { withStyledBlockContarom "./block-container/components/withBlockContainer";

type TEditor = PlateEditor & ReactEditor & HistoryEditor

const ContentEditor = () => {
  console.log('ContentEditor')
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


  const editableProps = {
    placeholder: 'Type…',
    style: {
      padding: '15px',
    },
  };

  // const { content: initialValue } = useContext(ContentContext);
  // console.log(initialValue)
  const plateComponents = createPlateComponents();

  let components = {
    ...plateComponents,
    'multi-text': MultiTextElement
  }


  // components = withBlockContainers(components,[{}])
  components = withStyledBlockContainers(components)
  components = withStyledDraggables(components)
  const options = createPlateOptions();

  const plugins = [ ...basicNodesPlugins,
    createMultiTextPlugin(),
    createMediaEmbedPlugin(),
    createSelectOnBackspacePlugin({ allow: ['media_embed'] }),
    

    createNodeIdPlugin(),
    createDndPlugin(),
  ];

  // const store = usePlateStore();

  // const editorVal = usePlateValue()

  const handleChange = (mainEditorElements) => {
    return false
    const newContent = mainEditorElements.map(el => {
      return (el.id in store) ? {
        ...el,
        children: store[el.id].value
      } : el
    })
    
    setContent(newContent)
  }

  // const {content, setContent} = useContext(ContentContext)

  const pluginsMemo: PlatePlugin<TEditor>[] = useMemo(() => {  
    return plugins
  }, [])

  return (
    <>
      <DndProvider backend={HTML5Backend}>
          <Plate
            id="content-editor"
            plugins={pluginsMemo}
            components={components}
            options={options}
            editableProps={editableProps}
            // initialValue={initialValue}
            // onChange={handleChange}
          >  <HeadingToolbar>
          <Toolbar />
        </HeadingToolbar></Plate>
      </DndProvider>

      <pre className='text-grey'>
        {/* {JSON.stringify(content, null, 2)} */}
        {/* {JSON.stringify(editorVal, null, 2)} */}
      </pre>
      {/* <ShowStore /> */}
    </>
  );
}

export default ContentEditor
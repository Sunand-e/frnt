import cache, { currentContentItemVar } from "../../../graphql/cache";

import { useDebouncedCallback } from 'use-debounce';
import { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { useContentTitle } from "./useContentTitle";

export const ContentTitle = () => {

  const currentContentItem = useReactiveVar(currentContentItemVar)
  const { id, updateFunction } = currentContentItem
  
  // const editorRef = usePlateEditorRef(id)

  const { title } = useContentTitle()

  const handleUpdate = useDebouncedCallback((data) => {
    const title = data[0].children[0].text
    updateFunction({title});
  }, 800)

  const handleChange = data => {
    
    // if (editorRef.operations.some(op => op.type !== "set_selection")) {
    //   handleUpdate(data)
    // }
  }
  
  // const platePlugins = createPlugins([
  //   createSingleLinePlugin()
  // ])

  useEffect(() => {
    !title && setTimeout(focus, 0);
  },[])

  const focus = () => {
    // if(editorRef) {
      // Transforms.select(editorRef.editor, Editor.end(editor, []));
      // ReactEditor.focus(editor);  
    // }
  }
  
  // const initialValue = [{children: [{text: title ?? ''}]}]
  return (
    <div className={`flex justify-center`}>
      <h1 className="mt-3 mb-8 w-full max-w-screen-lg">
      {title}
        {/* <Plate
          id={id}
          editableProps={{placeholder: 'Enter lesson title...'}}
          onChange={handleChange}
          initialValue={initialValue}
          plugins={platePlugins}
        /> */}
      </h1>
    </div>
  );
}

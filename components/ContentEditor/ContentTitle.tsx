import { createPlugins, Plate, createSingleLinePlugin } from "@udecode/plate-headless";
import { getPlateEditorRef } from "@udecode/plate";
import cache, { currentContentItemVar } from "../../graphql/cache";
import { ContentFragment } from "../../graphql/queries/allQueries";

import { useDebouncedCallback } from 'use-debounce';
import { useEffect } from "react";
import { ReactEditor } from "slate-react";
import { Editor, Transforms } from "slate";
import { useReactiveVar } from "@apollo/client";

export const ContentTitle = () => {

  const currentContentItem = useReactiveVar(currentContentItemVar)
  const { id, updateFunction } = currentContentItem
  
  const { title } = cache.readFragment({
    id:`ContentItem:${id}`,
    fragment: ContentFragment,
  })
  
  const handleChange = useDebouncedCallback((data) => {
    const title = data[0].children[0].text
    updateFunction({title});
  }, 800)
  
  const platePlugins = createPlugins([
    createSingleLinePlugin()
  ])

  useEffect(() => {
    !title && setTimeout(focus, 0);
  },[])

  const focus = () => {
    const editor = getPlateEditorRef(id)
    if(editor) {
      Transforms.select(editor, Editor.end(editor, []));
      ReactEditor.focus(editor);  
    }
  }
  
  return (
    <div className={`flex justify-center`}>

    <h1 className="mt-3 mb-8 w-full max-w-screen-lg">
      <Plate
        id={id}
        editableProps={{placeholder: 'Enter lesson title...'}}
        onChange={handleChange}
        initialValue={[{children: [{text: title ?? ''}]}]}
        plugins={platePlugins}
      />
    </h1>
    </div>
  );
}

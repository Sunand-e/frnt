import { createPlugins, Plate } from "@udecode/plate-headless";
import { FC, useEffect, useState } from "react"
import cache, { currentContentItemVar } from "../../graphql/cache";
import { ContentFragment } from "../../graphql/queries/allQueries";
import { CONFIG } from "./blocks/TextBlock/config";
import useBlockEditor from "./useBlockEditor";

import { useDebouncedCallback } from 'use-debounce';

export const ContentTitle = () => {

  const { id, type, updateFunction, updateTitleFunction } = currentContentItemVar()
  
  const { title } = cache.readFragment({
    id:`ContentItem:${id}`,
    fragment: ContentFragment,
  })
  
  const handleChange = useDebouncedCallback((data) => {
    const title = data[0].children[0].text
    updateTitleFunction(title);
  }, 800)
  
  return (
    <div className={`flex justify-center`}>

    <h1 className="mt-3 mb-8 w-full max-w-screen-lg">
      <Plate
        id={id}
        editableProps={{placeholder: 'Enter a title...'}}
        onChange={handleChange}
        initialValue={[{children: [{text: title ?? ''}]}]}
      />
    </h1>
    </div>
  );
}

import { MultipleContainers } from "./MultipleContainers"
import { useContext, useEffect, useMemo, useState } from "react"
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { StructureProvider, useStructureContext } from "./CourseStructureStore";

const CourseStructureEditorTest = () => {

  const items = useMemo(() => ({
    "a": ["x"],
    "b": ["y"],
    "c": ["z"]
  }),[])

  const sectionIds = useMemo(() => ["a","b", "c"],[])

  return (
    <StructureProvider
      items={items}
      sectionIds={sectionIds}
    >
      <CourseStructure />
    </StructureProvider>
  )
}

const CourseStructure = ({renderItem = null}) => {

  const items = useStructureContext((state) => state.items)
  const setItems = useStructureContext((state) => state.setItems)
  const setSectionIds = useStructureContext((state) => state.setSectionIds)

  return (
    <>
      <MultipleContainers 
        vertical
        renderItem={renderItem}
        // onAddColumn={handleAddSectionModal}
        modifiers={[restrictToVerticalAxis]}
        // onRemoveContainer={handleDeleteSection}
        onDragContainerEnd={setSectionIds}
        onDragItemEnd={setItems}
      />
      {/* {sectionIds} */}
      <pre>
      { JSON.stringify(items,null,2) }
      </pre>
    </>
  )
}

export default CourseStructureEditorTest


import { useBlockStore } from "./useBlockStore";
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import BlockCanvas from "./BlockCanvas";
import { useSaveContentButton } from "./useSaveContentButton";
import { useRouter } from "../../../utils/router";
import useUpdateLesson from "../../../hooks/lessons/useUpdateLesson";
import { useCallback } from "react";
import useWarningOnExit from "../../../hooks/useWarningOnExit";
import usePageTitle from "../../../hooks/usePageTitle";
import { useLessonContentFragment } from "../../../hooks/lessons/useLessonContentFragment";

const BlockEditor = () => {

  const router = useRouter()
  const { cid: id } = router.query
  
  const blocks = useBlockStore(state => state.blocks)
  const blockIds = blocks.map(block => block.id)
  const content = { blocks }
  const isDirty = useBlockStore(state => state.isDirty)
  const setIsDirty = useBlockStore(state => state.setIsDirty)

  useWarningOnExit(isDirty)

  const { updateLesson } = useUpdateLesson()

  const { complete, data: lesson } = useLessonContentFragment(id)
  
  usePageTitle({ 
    title: lesson?.title || 'Untitled Lesson', 
    editable:  lesson?.title || 'Untitled Lesson', 
    onEdit: (title: string) => {
      updateLesson(id)({title})
    }
  })

  const handleSave = useCallback(async () => {
    await updateLesson(id)({content}).then(res => {
      setIsDirty(false)
    })
  },[content, isDirty, updateLesson])
  
  useSaveContentButton({
    typeName: 'lesson', 
    onSave: handleSave, 
    isDirty
  })

  return (
    <>
      <SortableContext
        id="editor_pane"
        items={blockIds}
        strategy={verticalListSortingStrategy}
      >
        <BlockCanvas />
      </SortableContext>
    </>
  );
};

export default BlockEditor

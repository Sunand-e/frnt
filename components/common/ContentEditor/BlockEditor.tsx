
import { useBlockStore } from "./useBlockStore";
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import BlockCanvas from "./BlockCanvas";

const BlockEditor = () => {

  const blockIds = useBlockStore(state => state.blocks.map(block => block.id))

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

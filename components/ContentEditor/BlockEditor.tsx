
import { motion, AnimatePresence, useMotionValue, useDragControls } from "framer-motion";
import { memo, useState } from "react"
import { Reorder } from "framer-motion";
import BlockContainer from "./BlockContainer";
import BlockSelector from "./BlockSelector";
import useBlockEditor from "./useBlockEditor";
import { useRaisedShadow } from "../../hooks/useRaisedShadow";

const ReorderableBlock = ({id}) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
 
  return (
    <Reorder.Item value={id} id={id} dragListener={false} style={{ boxShadow, y }}>
      <BlockContainer id={id} />
    </Reorder.Item> 
  )
}

const BlockEditor = () => {

  const { blocks, blockIds } = useBlockEditor()
  const [items, setItems] = useState(blocks);

  return (
    <>
        <div className="list">
          <Reorder.Group axis="y" onReorder={setItems} values={items}>
            {blockIds.map((id, idx) => <ReorderableBlock key={id} id={id} />)}
          </Reorder.Group>
        </div>
      <div className={`w-full flex flex-col items-center mt-4`}>
        <div className="w-full max-w-screen-lg bg-blue p-4 bg-opacity-10 border-2 border-dashed border-grey">
          <div className={`text-center text-main-dark font-semibold pb-4`}>
            Add a new block
          </div>
          <BlockSelector className={``} style={{}} />
        </div>
      </div>
    </>
  );
};

export default BlockEditor

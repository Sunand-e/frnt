
import { useMotionValue } from "framer-motion";
import { Reorder } from "framer-motion";
import BlockContainer from "./BlockContainer";
import BlockSelector from "./BlockSelector";
import { useRaisedShadow } from "../../../hooks/useRaisedShadow";
import { useBlockStore } from "./useBlockStore";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useWarningOnExit from "../../../hooks/useWarningOnExit";

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

  const editBlocks = useBlockStore(state => state.editBlocks)
  const blocks = useBlockStore(state => state.blocks)
  const isDirty = useBlockStore(state => state.isDirty)
  const blockIds = useBlockStore(state => state.blocks.map(block => block.id))
  const setBlocks = useBlockStore(state => state.setBlocks)
  

  const router = useRouter()
  
  // useWarningOnExit(isDirty)

  useEffect(() => {
    return () => setBlocks([])
  }, [])

  return (
    <>
    {/* <pre>
    { JSON.stringify(blocks,null,2) }
    </pre> */}
      <div className="list">
        {/* <Button onClick={handleClick}>Click</Button> */}
        <Reorder.Group axis="y" onReorder={editBlocks} values={blocks}>
          {blockIds.map(id => {
            return <ReorderableBlock key={id} id={id} />
          })}
        </Reorder.Group>
      </div>
      <div className={`w-full flex flex-col items-center mt-4`}>
        <div className="w-full max-w-screen-lg bg-main p-4 bg-opacity-10 border-2 border-dashed border-grey">
          <div className={`text-center text-main-secondary font-semibold pb-4`}>
            Add a new block
          </div>
          <BlockSelector
            className={`text-main-secondary mb-4 flex flex-wrap gap-4 justify-center align-center items-center sm:grid-cols-3 lg:grid-cols-6 text-sm`}
            blockButtonClassName={`flex items-center space-x-2 p-2 text-center bg-white rounded-lg shadow shadow-lg`}
          />
        </div>
      </div>
    </>
  );
};

export default BlockEditor

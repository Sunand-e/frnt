
import { motion, AnimatePresence, useMotionValue, useDragControls } from "framer-motion";
import { Reorder } from "framer-motion";
import BlockContainer from "./BlockContainer";
import BlockSelector from "./BlockSelector";
import { useRaisedShadow } from "../../hooks/useRaisedShadow";
import { useBlockStore } from "./useBlockStore";
import { useEffect } from "react";
import useBlockEditor from "./useBlockEditor";
import { useDebouncedCallback } from 'use-debounce';
import { currentContentItemVar } from "../../graphql/cache";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";

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

  const setBlocks = useBlockStore(state => state.setBlocks)
  const blocks = useBlockStore(state => state.blocks)
  const blockIds = useBlockStore(state => state.blocks.map(block => block.id))

  const {getContent, content} = useBlockEditor()

  const currentContentItem = useReactiveVar(currentContentItemVar)
  const { updateFunction } = currentContentItem
  const afunc = (val) => {
    console.log('aabbccdd')
    updateFunction(val)
  }
  const debouncedUpdate = useDebouncedCallback(afunc, 600)

  const router = useRouter()
  
  useEffect(() => {
    getContent()
  },[router.query?.cid])
  
  useEffect(() => {
    if(content) {
      setBlocks(content?.blocks || []);
    }
  }, [content])


  useEffect(() => {
    console.log('content')
    console.log(content)
    console.log('blocks')
    console.log(blocks)
    if(content) {
      debouncedUpdate({content: { blocks }})
    }
  },[content, blocks])

  return (
    <>
      <div className="list">
        {/* <Button onClick={handleClick}>Click</Button> */}
        <Reorder.Group axis="y" onReorder={setBlocks} values={blocks}>
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
          <BlockSelector className={``} style={{}} />
        </div>
      </div>
    </>
  );
};

export default BlockEditor

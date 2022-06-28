
import { memo } from "react"
import { Flipper, Flipped } from "react-flip-toolkit"
import BlockContainer from "./BlockContainer";
import BlockSelector from "./BlockSelector";
import useBlockEditor from "./useBlockEditor";

interface FlippedContainerProps {
  blockId: any;
}
const FlippedContainer = memo(({blockId}: FlippedContainerProps) => {
  
  const { blocks } = useBlockEditor()

  const block = blocks.find(block => block.id === blockId)
  
  // console.log('rendered a bock in a map from blockId. id: ' + block.id)
  return (
    // <Flipped translate flipId={blockId} key={idx}>
    <div className="flipped-container">
    <BlockContainer
      id={block.id}
      key={block.id}
    />
  </div>
// </Flipped>

  )
}) 
const BlockEditor = () => {

  const { blocks, blockIds } = useBlockEditor()
  
  return (
    <>
      <Flipper
        flipKey={blockIds.join("")}
      >
        <div className="list">
          {blockIds.map((blockId, idx) => {
            return <FlippedContainer key={idx} blockId={blockId} />
          })}
        </div>
      </Flipper>
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


import { Flipper, Flipped } from "react-flip-toolkit"
import BlockContainer from "./BlockContainer";
import BlockSelector from "./BlockSelector";
import useBlockEditor from "./useBlockEditor";

const BlockEditor = () => {

  const { blocks, blockIds } = useBlockEditor()
  
  return (
    <>
      <Flipper
        flipKey={blockIds.join("")}
      >
        <div className="list">
          {blockIds.map((blockId, idx) => {
            const block = blocks.find(block => block.id === blockId)
            return (
              <Flipped translate flipId={blockId} key={idx}>
                <div className="flipped-container">
                  <BlockContainer
                    block={block}
                    key={block.id}
                  />
                </div>
              </Flipped>
          )})}
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

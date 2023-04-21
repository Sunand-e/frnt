import { getBlock, useBlockStore } from "../useBlockStore";
import blocktypes from "../blocktypes";

export const BlockPanel = () => {

  const activeBlock = useBlockStore(state => getBlock(state.activeBlockId))

  if(!activeBlock) {
    return null
  }

  const BlockSettingsComponent = blocktypes[activeBlock.type]?.settingsComponent

  return (
    <>
      <BlockSettingsComponent block={activeBlock} />
    </>
  )
}
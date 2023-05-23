import { getBlock, useBlockStore } from "../useBlockStore";
import blocktypes from "../blocktypes";
import BlockGeneralSettings from "../blocks/common/BlockGeneralSettings";

export const BlockPanel = () => {

  const activeBlock = useBlockStore(state => getBlock(state.activeBlockId))

  if(!activeBlock) {
    return null
  }

  const BlockSettingsComponent = blocktypes[activeBlock.type]?.settingsComponent

  return (
    <>
      <BlockSettingsComponent block={activeBlock} />
      <BlockGeneralSettings block={activeBlock} />
    </>
  )
}
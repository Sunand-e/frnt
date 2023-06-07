import { getBlock, useBlockStore } from "../useBlockStore";
import blocktypes from "../blocktypes";
import BlockGeneralSettings from "../blocks/common/BlockGeneralSettings";

export const BlockSettingsPanel = () => {

  const activeBlock = useBlockStore(state => getBlock(state.activeBlockId))

  if(!activeBlock) {
    return null
  }

  const BlockSettingsComponent = blocktypes[activeBlock.type]?.settingsComponent

  return (
    <div className="flex flex-col space-y-3">
      <BlockSettingsComponent block={activeBlock} />
      <BlockGeneralSettings block={activeBlock} />
    </div>
  )
}
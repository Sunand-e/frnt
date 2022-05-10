import { useEffect, useState } from "react"
import Tabs from "../../../common/containers/Tabs"
import blocktypes from "../../blocktypes"
import useBlockEditor from "../../useBlockEditor"
// import SettingsPanel from "./SettingsPanel"
import StylingPanel from "./StylingPanel"

const BlockSettings = ({block}) => {

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const SettingsPanel = blocktypes[block.type].settingsComponent

  const tabs =  [
    {
      name: 'Settings',
      component: SettingsPanel
    },
    {
      name: 'Styling',
      component: StylingPanel
    },
  ]

  const TabPanelComponent = tabs[activeTabIndex].component
  return (
    <>
      <Tabs tabs={tabs} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} className="mb-2" />
      <TabPanelComponent block={block} />
    </>
  )
}

export default BlockSettings
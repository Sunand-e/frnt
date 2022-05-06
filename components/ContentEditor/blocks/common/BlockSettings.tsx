import { useState } from "react"
import Tabs from "../../../common/containers/Tabs"
import ContentSettings from "./ContentSettings"
import StylingSettings from "./StylingSettings"

const BlockSettings = ({block}) => {

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const tabs =  [
    {
      name: 'Content',
      component: ContentSettings
    },
    {
      name: 'Styling',
      component: StylingSettings
    },
  ]

  const TabPanelComponent = tabs[activeTabIndex].component
  return (
    <>
      <Tabs tabs={tabs} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} className="mb-2" />
      <TabPanelComponent />
    </>
  )
}

export default BlockSettings
import { useEffect, useState } from "react"
import Tabs from "../../../containers/Tabs"
import FourNumberInput from "../../../inputs/FourNumberInput"
import NumberPropertyInput from "../../../inputs/NumberPropertyInput"
import blocktypes from "../../blocktypes"
import useBlockEditor from "../../useBlockEditor"
import { getIndexAndParent, useBlockStore } from "../../useBlockStore"
// import SettingsPanel from "./SettingsPanel"
import StylingPanel from "./StylingPanel"

const BlockGeneralSettings = ({block}) => {

  const {parent} = getIndexAndParent(block.id)
  return (
    <>
      { (!parent || parent.type === 'columns') && <StylingPanel block={block} /> }
    </>
  )
}

export default BlockGeneralSettings
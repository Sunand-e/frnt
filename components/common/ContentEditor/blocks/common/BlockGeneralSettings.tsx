import { useEffect, useState } from "react"
import Tabs from "../../../containers/Tabs"
import FourNumberInput from "../../../inputs/FourNumberInput"
import NumberPropertyInput from "../../../inputs/NumberPropertyInput"
import blocktypes from "../../blocktypes"
import useBlockEditor from "../../useBlockEditor"
// import SettingsPanel from "./SettingsPanel"
import StylingPanel from "./StylingPanel"

const BlockGeneralSettings = ({block}) => {

  return (
    <>
      {/* <span className="text-sm font-medium text-secondary">Padding</span>
      <div className={`flex w-full items-center space-x-4 mb-2`}>
        <NumberPropertyInput 
          label="Top"
          step={1}
          unit="px"
        />
        <NumberPropertyInput
          label="Bottom"
          step={1}
          unit="px"
        />
      </div>

      <div className={`flex w-full items-center space-x-4`}>
        <NumberPropertyInput 
          label="Left"
          step={1}
          unit="px"
        />
        <NumberPropertyInput
          label="Right"
          step={1}
          unit="px"
        />
      </div> */}
      
      <StylingPanel block={block} />
    </>
  )
}

export default BlockGeneralSettings
import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import PaddingSelect from "./settings/inputs/PaddingSelect"

const StylingPanel = ({children = null}) => {

  const [color, setColor] = useState("#aabbcc");

  const selectPadding = v => {
    alert(JSON.stringify(v.value, null))
  }

  const selectBackground = v => {
    alert(JSON.stringify(v.value, null))
  }

  return (
    <>
      <PaddingSelect 
        side='top'
        onSelect={selectPadding}
        selected='none'
        label="Padding Top"
      />
      
      <PaddingSelect 
        side='bottom'
        onSelect={selectPadding}
        selected='none'
        label="Padding Bottom"
      />
    <div>
      <HexColorPicker color={color} onChange={setColor} />
      <HexColorInput color={color} onChange={setColor} />
    </div>
    </>
  )
}

export default StylingPanel
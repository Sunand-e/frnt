import { useState } from "react";
import useBlockEditor from "../../useBlockEditor";
import ColorPicker from "./settings/inputs/ColorPicker";
import PaddingSelect from "./settings/inputs/PaddingSelect"

const StylingPanel = ({block, children = null}) => {

  const { updateBlockProperties, getIndexAndParent } = useBlockEditor(block)
  const { parent } = getIndexAndParent(block?.id)

  const selectPadding = (value, side) => {
    const paddingProperty = `padding${side[0].toUpperCase() + side.substring(1)}`
    updateBlockProperties(block, {[paddingProperty]: value})
  }
  
  const updateBgColor = value => {
    updateBlockProperties(block, {bgColor: value})
  }

  return (
    <div className="flex flex-col space-y-3">
      <div id="block_padding_settings" className="">
        <label className="text-sm font-medium text-secondary mb-2 block">Padding</label>
        {/* { !parent ? ( */}
        <div className={`flex w-full items-center space-x-4 mb-2`}>
          <PaddingSelect
            side='top'
            onSelect={data => selectPadding(data.value, 'top')}
            // selected='none'
            selected={block.properties.paddingTop}
            label="Top"
            />  
          <PaddingSelect 
            side='bottom'
            onSelect={data => selectPadding(data.value, 'bottom')}
            selected={block.properties.paddingBottom}
            label="Bottom"
          />
        </div>
      </div>
      <ColorPicker
        label="Background color"
        onChange={updateBgColor}
        value={block?.properties?.bgColor}
      />
    </div>
  )
}

export default StylingPanel
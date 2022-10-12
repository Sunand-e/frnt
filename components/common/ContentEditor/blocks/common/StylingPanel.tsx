import { useState } from "react";
import useBlockEditor from "../../useBlockEditor";
import ColorPicker from "./settings/inputs/ColorPicker";
import PaddingSelect from "./settings/inputs/PaddingSelect"

const StylingPanel = ({block: origBlock, children = null}) => {

  const [block, setBlock] = useState(origBlock)

  const { updateBlockProperties, getIndexAndParent } = useBlockEditor(block)
  const { parent } = getIndexAndParent(block?.id)

  const selectPadding = (value, side) => {
    const paddingProperty = `padding${side[0].toUpperCase() + side.substring(1)}`
    setBlock(updateBlockProperties(block, {[paddingProperty]: value}))
  }
  
  const updateBgColor = value => {
    setBlock(updateBlockProperties(block, {bgColor: value}))
  }
  
  const updateTextColor = value => {
    setBlock(updateBlockProperties(block, {textColor: value}))
  }


  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        { !parent ? (
          <>
            <PaddingSelect
              side='top'
              onSelect={data => selectPadding(data.value, 'top')}
              selected='none'
              label="Padding Top"
            />  
            <PaddingSelect 
              side='bottom'
              onSelect={data => selectPadding(data.value, 'bottom')}
              selected='none'
              label="Padding Bottom"
              />
            </>
          ) : (
            <>
              <PaddingSelect
                side='left'
                onSelect={data => selectPadding(data.value, 'left')}
                selected='none'
                label="Padding Left"
              />
              <PaddingSelect 
                side='right'
                onSelect={data => selectPadding(data.value, 'right')}
                selected='none'
                label="Padding Right"
              />
            </>
          )
        }
      </div>
      <ColorPicker
        label="Background Color"
        onChange={updateBgColor}
        value={block?.properties?.bgColor}
      />
      <ColorPicker
        label="Default Text Color"
        onChange={updateTextColor}
        value={block?.properties?.textColor}
      />
    </div>
  )
}

export default StylingPanel
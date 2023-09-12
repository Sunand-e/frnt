import Tippy from "@tippyjs/react"
import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful"
import { useController } from "react-hook-form";

const ColorPickerInputLegacy = ({label, name, control}) => {

  // Get field object, which contains methods to update field's value, etc
  const { field } = useController({
    control,
    name
  });

  // Internal component state to change colours in colour pickers, and value of input element
  const [ color, setColor ] = useState(field.value);

  // On selecting a colour, update local state AND form field value
  const onChange = (value) => {
    setColor(value)
    field.onChange(value)
  }

  return (
    <div>
      <label className={`block`}>
        { label && (
          <span className="text-sm font-medium text-gray-700">{ label }</span>
        )}
        <div className="flex space-x-2">
          <Tippy
            className="bg-white text-main pt-1"
            interactive={true}
            placement='right' // placement='right-start'
            theme="memberhub-white"
            trigger="click"
            // appendTo={document.body}
            popperOptions={{
              strategy: 'fixed',
            }}
            content={
              <div>
                <HexColorPicker color={color} onChange={onChange} />
              </div>
            }
            >
            <input onClick={(e) => e.preventDefault()} className="flex items-center w-12 h-8" type="color" value={color} onChange={onChange} />
          </Tippy>
          <HexColorInput color={color} alpha={true} onChange={onChange} />
        </div>
      </label>
    </div>
  )
}

export default ColorPickerInputLegacy
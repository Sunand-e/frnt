import Tippy from "@tippyjs/react"
import { HexColorInput, HexColorPicker } from "react-colorful"

const ColorPicker = ({label=null, value, onChange}) => {
  return (
    <div className="text-sm font-medium text-secondary">
      { label && <label className="block mb-2">{label}</label> }
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
              <HexColorPicker color={value} onChange={onChange} />
            </div>
          }
          >
          <input onClick={(e) => e.preventDefault()} className="flex items-center w-12 h-8" type="color" value={value} />
        </Tippy>
        <HexColorInput color={value} onChange={onChange} alpha={true} />
      </div>
    </div>
  )
}

export default ColorPicker
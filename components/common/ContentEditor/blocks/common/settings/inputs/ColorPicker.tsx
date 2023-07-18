import Tippy from "@tippyjs/react"
import ColorPickerControl from "../../../../../inputs/ColorPickerControl"

const ColorPicker = ({label=null, value, onChange}) => {
  return (
    <div className="text-sm font-medium text-secondary">
      { label && <label className="block mb-2">{label}</label> }
      <Tippy
        className="bg-white text-main"
        interactive={true}
        placement='right' // placement='right-start'
        theme="memberhub-white"
        trigger="click"
        appendTo={document.body}
        popperOptions={{
          strategy: 'fixed',
        }}
        content={
          <div>
            <ColorPickerControl onChange={onChange} color={value} />
          </div>
        }
        >
          <div 
            className="flex items-center w-12 h-8 border border-gray-400"
            style={{backgroundColor: value}}
          />
      </Tippy>
      { value && (
        <span 
          onClick={() => onChange('')}
          className="text-main"
        >
          clear
        </span>
      )}
    </div>
  )
}

export default ColorPicker
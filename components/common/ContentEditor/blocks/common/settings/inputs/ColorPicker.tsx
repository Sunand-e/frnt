import Tippy from "@tippyjs/react"
import classNames from "../../../../../../../utils/classNames";
import ColorPickerControl from "../../../../../inputs/ColorPickerControl"
import noBgCross from './noBgCross.svg';

const ColorPicker = ({
  label=null, 
  value, 
  defaultValue='',
  clearOrReset='clear',
  onChange
}) => {

  // This is for 'no bg' cross:
  const svgCross = () => (
    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <path className="checkmark__check" fill="none" d="M16 16 36 36 M36 16 16 36" />
    </svg>
  )

  return (
    <div className="flex space-x-2 items-center justify-between text-sm font-medium text-secondary mr-1">
      { label && <label className="block">{label}</label> }
      <div className="flex space-x-2 items-center">
        
        { value && (
          <span 
            onClick={() => onChange('')}
            className="text-main"
          >
            {clearOrReset}
          </span>
        )}
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
            <div className="overflow-visible">
              <ColorPickerControl onChange={onChange} color={value} />
            </div>
          }
          >
            <button 
              className={classNames(
                !defaultValue && 'bg-gray-200',
                `w-11 h-6
                relative
                ring-2
                focus:ring-4 
                ring-main-dark-30/50
                rounded-full peer dark:bg-gray-700 
                flex items-center w-12 h-8 `
              )}
              style={{backgroundColor: value || defaultValue}}
            />
        </Tippy>
      </div>
    </div>
  )
}

export default ColorPicker
import { ReactHTMLElement, ReactNode } from "react"
import classNames from "../../../utils/classNames"

interface RadioButtonsInputProps {
  label?: string
  inputAttrs?: any
  className?: string
  horizontal?: boolean
  labelClassName?: string
  error: ReactNode
  options: Array<{
    text: string
    value: string
  }>
  onClick?: () => void
}
const RadioButtonsInput = ({
  label='',
  inputAttrs = {},
  className='',
  options=[],
  horizontal=false,
  labelClassName='',
  error='',
  onClick
} : RadioButtonsInputProps ) => {

  return (
    <div className={classNames(
      'flex-col space-y-2',
      `flex`,
      className
    )} onClick={onClick}>
      { label && <span className={classNames(
        "font-medium text-secondary",
        labelClassName
      )}>{ label }</span> }
      { error && <span className={classNames(
        "text-red-500 mt-0",
      )}>{ error }</span> }
      <div className={classNames(
        !!horizontal ? "flex space-x-4" : "flex flex-col space-y-1 items-start"
      )}>
        {options.map(option => (
          <label key={option.value} className={classNames(
            "flex items-center space-y-0",
            !!horizontal && "flex-col",
          )}>
            <input
              type="radio"
              id={`${label}_${option.value}`}
              value={option.value}
              className={classNames(
                `h-4 w-4 text-main focus:ring-main border-gray-300 rounded-full`,
                !horizontal && 'mr-2'
              )}
              { ...inputAttrs }
            />
            <span>{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioButtonsInput
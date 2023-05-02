interface RadioButtonsInputProps {
  label?: string
  inputAttrs?: any
  className?: string
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
  onClick
} : RadioButtonsInputProps ) => {

  return (
    <div className={`flex flex-col space-y-2 ${className}`} onClick={onClick}>
      { label && <span className="text-sm font-medium text-secondary">{ label }</span> }
      {options.map(option => (
        <label className="flex items-center">
          <input
            type="radio"
            id={`${label}_${option.value}`}
            value={option.value}
            className="h-4 w-4 text-main focus:ring-main border-gray-300 rounded-full mr-2" 
            { ...inputAttrs }
          />
          <span>{option.text}</span>
        </label>

      ))}
    </div>
  )
}

export default RadioButtonsInput
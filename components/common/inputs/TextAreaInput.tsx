import classNames from "../../../utils/classNames"

interface TextAreaInputProps {
  label?: string
  inputAttrs?: any
  type?: string
  className?: string
  labelClassName?: string
  placeholder?: string,
  onClick?: () => void
}
const TextAreaInput = ({
  label='',
  inputAttrs = {},
  className='',
  labelClassName='',
  placeholder: placeholder = '',
  onClick
} : TextAreaInputProps ) => {

  return (
    <label className={`block ${className}`} onClick={onClick}>
      { label && <span className={classNames(
        "text-sm font-medium text-secondary",
        labelClassName
      )}>{ label }</span> }
      <textarea
        className="
          px-3
          p-1.5
          block
          w-full
          rounded-md
          border-gray-300 hover:border-gray-400/60
          shadow-sm
          focus:border-main focus:ring focus:ring-main/50
        "
        { ...inputAttrs }
        placeholder={placeholder}
      />
    </label>
  )
}

export default TextAreaInput
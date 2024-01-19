import classNames from "../../../utils/classNames"

interface TextInputProps {
  label?: string
  inputAttrs?: any
  type?: string
  className?: string
  labelClassName?: string
  placeholder?: string,
  onClick?: () => void
}
const TextInput = ({
  label='',
  inputAttrs = {},
  type="text",
  className='',
  labelClassName='',
  placeholder: placeholder = '',
  onClick
} : TextInputProps ) => {

  return (
    <label className={`block ${className}`} onClick={onClick}>
      { label && <span className={classNames(
        "text-sm font-medium text-secondary",
        labelClassName
      )}>{ label }</span> }
      <input
        type={type}
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

export default TextInput
import { useState } from "react"
import classNames from "../../../utils/classNames"
import { Eye } from "@styled-icons/fluentui-system-regular/Eye"
import { EyeOff } from "@styled-icons/fluentui-system-regular/EyeOff"

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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setIsPasswordVisible(prevState => !prevState);
  }
 
  return (
    <label className={`block relative ${className}`} onClick={onClick}>
      { label && <span className={classNames(
        "text-sm font-medium text-secondary",
        labelClassName
      )}>{ label }</span> }
      <span className="block relative">
        <input
          type={type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type}
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
        { type === 'password' && (
          <span className="text-gray-500 items-center absolute right-2 top-1" onClick={handlePasswordVisibilityToggle}>
            { isPasswordVisible ? (
              <EyeOff className="h-6 w-6" />
            ) : (
              <Eye className="h-6 w-6" />
            )}
          </span>
        )}
      </span>
    </label>
  )
}

export default TextInput
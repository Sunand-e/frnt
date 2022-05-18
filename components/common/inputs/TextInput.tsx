const TextInput = ({
  label,
  inputAttrs = {},
  type="text",
  className='',
  placeholder: placeholder = ''
}) => {

  return (
    <label className={`block ${className}`}>
      <span className="text-gray-700">{ label }</span>
      <input
        type={type}
        className="
          mt-1
          block
          w-full
          rounded-md
          border-main/50
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
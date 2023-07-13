const CheckboxInput = ({
  label,
  inputAttrs,
  labelClassName='',
  placeholder: placeholder = ''
}) => {

  return (
    <label className="flex w-full justify-between">
      <span className={`text-gray-700 ${labelClassName}`}>{ label }</span>
      <input 
        type="checkbox"
        className="
          mt-1
          block
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

export default CheckboxInput

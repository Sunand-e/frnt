const SelectInput = ({
  label,
  inputAttrs,
  options,
  placeholder: placeholder = ''
}) => {

  return (
    <label className="block">
      <span className="text-gray-700">{ label }</span>
      <select
        className="
          block
          w-full
          mt-1
          rounded-md
          border-main/50
          shadow-sm
          focus:border-main focus:ring focus:ring-main/50
        "
        { ...inputAttrs }
      >
        { options?.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SelectInput
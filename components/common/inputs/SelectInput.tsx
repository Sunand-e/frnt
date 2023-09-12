const SelectInput = ({
  label = "",
  inputAttrs = {},
  options = [],
  placeholder: placeholder = ''
}) => {

  return (
    <label className="block">
      { label && <span className="text-sm font-medium text-gray-700">{ label }</span> }
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
        { options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SelectInput
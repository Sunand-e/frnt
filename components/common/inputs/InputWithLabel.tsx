const InputWithLabel = ({
  label,
  value, 
  type='text', 
  onChange, 
  name: name = '',
  placeholder: placeholder = ''
}) => {

  return (
    <div className="mb-4">
      <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor={name}>
        { label }
      </label>
      <input
        type={type}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        value={value}
        id={name} type="text" placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

export default InputWithLabel
type ResourceUrlInputProps = { 
  inputAttrs?
  label?: string
  placeholder?: string
  setType
}

const ResourceUrlInput = ({
  inputAttrs = {},
  placeholder = '',
  label,
  setType,
}: ResourceUrlInputProps) => {
  return (
    <input
      type="text"
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
      placeholder={"Enter a URL"}
    />
  )
}

export default ResourceUrlInput
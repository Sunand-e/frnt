const DropzoneIconAndText = ({icon=null, fileHintText='', linkText='Upload a file', openMediaLibrary=null}) => {

  const handleClick = (e) => {
    e.stopPropagation()
    openMediaLibrary()
  }
  return (
    <>
      {icon}
      <div className="flex w-full justify-center text-sm text-gray-600">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer rounded-md font-medium text-main focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-main"
        >
          <span className="hover:opacity-70">{linkText}</span>
        </label>
          { openMediaLibrary && (
            <>
              <span>{', '}</span>
              <button onClick={handleClick} className="font-medium hover:opacity-70 pl-1">choose from media library</button>
            </>
          )}
        <p className="pl-1">or drag and drop</p>
      </div>
      <p className="text-xs text-gray-500">{ fileHintText }</p>
    </>
  )
}

export default DropzoneIconAndText
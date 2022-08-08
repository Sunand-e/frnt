const DropzoneIconAndText = ({icon=null, fileHintText}) => {
  return (
    <>
      {icon}
      <div className="flex w-full justify-center text-sm text-gray-600">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer rounded-md font-medium text-main hover:opacity-70 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <span>Upload a file</span>
        </label>
        <p className="pl-1">or drag and drop</p>
      </div>
      <p className="text-xs text-gray-500">{ fileHintText }</p>
    </>
  )
}

export default DropzoneIconAndText
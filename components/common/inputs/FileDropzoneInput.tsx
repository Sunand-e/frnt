import { Control, useController } from "react-hook-form";
import FileDropzone from "../FileDropzone";
import DropzoneIconAndText from "./DropzoneIconAndText";

type FileDropzoneInputProps = { 
  control?: Control;
  initialValue?;
  accept?;
  dropZoneContent?;
  label?: string;
  name?: string;
}

const FileDropzoneInput = ({
  control,
  name,
  label,
  accept,
  dropZoneContent=null,
}: FileDropzoneInputProps) => {

  const { field } = useController({
    control,
    name
  });
  
  const handleDrop = (acceptedFiles, rejections, event) => {
    const file = acceptedFiles[0]
    field.onChange(file)
  }

  const handleClear = () => {
    field.onChange(null)
  }
  

  return (
    <div>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          {label}
        </span>
      </label>
      {/* {!field.value ? ( */}
        <FileDropzone
          multiple={false}
          onDrop={handleDrop}
          accept={accept}
          dropZoneContent={dropZoneContent}
        />
      {/* ) : (
        <></>// <p>{field.value.path}. <button onClick={handleClear}>Choose another file</button></p>
      )} */}
    </div>
  )
}

export default FileDropzoneInput
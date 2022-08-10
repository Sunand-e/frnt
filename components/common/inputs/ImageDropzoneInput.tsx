import { Control, useController } from "react-hook-form";
import ImageDropzone from "./ImageDropzone";

type ImageDropzoneInputProps = { 
  control?: Control;
  src?: string;
  initialValue?;
  previewClassName?: string;
  onSelect?;
  endpoint?;
  isModal?: boolean;
  label?: string;
  name?: string;
}

const ImageDropzoneInput = ({
  control,
  name,
  label,
  initialValue=null,
  previewClassName=''
}: ImageDropzoneInputProps) => {

  const { field } = useController({
    control,
    name
  });

  const handleDrop = (file) => {
    console.log(file)
    field.onChange(file)
  }

  return (
    <div>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          {label}
        </span>
      </label>
      <ImageDropzone
        initialValue={initialValue}
        multiple={false}
        onDrop={handleDrop}
        previewClassName={previewClassName}
      />
    </div>
  )
}

export default ImageDropzoneInput
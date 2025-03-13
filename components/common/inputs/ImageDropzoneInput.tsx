import { Control, useController } from "react-hook-form";
import ImageDropzone from "./ImageDropzone";

type ImageDropzoneInputProps = { 
  control?: any;
  src?: string;
  initialValue?: any;
  previewClassName?: string;
  onSelect?: any;
  endpoint?: any;
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

  const handleDrop = (file: any) => {
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
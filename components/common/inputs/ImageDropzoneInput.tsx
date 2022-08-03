import { Control, useController } from "react-hook-form";
import ImageDropzone from "./ImageDropzone";

type ImageDropzoneInputProps = { 
  control?: Control;
  src?: string;
  origImage?;
  onSelect?;
  endpoint?;
  isModal?: boolean;
  label?: string;
  name?: string;
}

const ImageDropzoneInput = ({
  control,
  name,
  label
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
        multiple={false}
        onDrop={handleDrop}
      />
    </div>
  )
}

export default ImageDropzoneInput
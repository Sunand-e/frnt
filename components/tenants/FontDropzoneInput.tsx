import { Control, useController, UseFormSetValue } from 'react-hook-form';
import DropzoneIconAndText from '../common/inputs/DropzoneIconAndText';
import FileDropzoneInput from '../common/inputs/FileDropzoneInput';

type FontDropzoneInputProps = { 
  control: Control;
  label?: string;
  name: string;
  setValue: UseFormSetValue<any>
}

const FontDropzoneInput = ({
  control,
  name,
  label,
  setValue
}: FontDropzoneInputProps) => {

  const { field } = useController({
    control,
    name
  });

  const dropZoneContent = field.value ? (
    <>
      <p className="relative rounded-md font-medium text-main">
        {field.value.name}
      </p>
      <p onClick={() => setValue(name, null)} className="text-xs text-gray-500">Choose another file</p>
    </>
  ) : (
    <DropzoneIconAndText
      linkText="Upload a font file"
      fileHintText="WOFF file, up to 10MB"
    />
  )
  return (
    <>
    <FileDropzoneInput
      label={label}
      control={control}
      name={name}
      dropZoneContent={dropZoneContent}
      accept={{
        'font/woff': ['.woff'],
        'font/woff2': ['.woff2'],
        'application/font-woff': ['.woff'],
      }}
    />
    </>
  );
}

export default FontDropzoneInput

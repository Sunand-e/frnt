import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Control, FieldValues, useController } from "react-hook-form";

const DropzoneField = ({
  name,
  control,
  ...props
}: {
  name: string;
  control: Control<FieldValues>;
}) => {
  // const { control } = useFormContext();
  const { field } = useController({ control, name, defaultValue: "" });

  return (
    <Dropzone onChange={(e: any) => field.onChange(e.target.files[0])} {...props} />
  );
};

const Dropzone = ({ onChange, ...props }: { onChange: (...event: any[]) => void }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log({ acceptedFiles });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps({ onChange })} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
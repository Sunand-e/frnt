import { Control, useController } from "react-hook-form"
import FontFamilySelect from "./FontFamilySelect";

interface FontFamilySelectInputProps {
  control?: Control;
  name?: string;
}

const FontFamilySelectInput = ({name, control}: FontFamilySelectInputProps) => {
  
  const { field } = useController({
    control,
    name
  });
  
  return (
    <FontFamilySelect
      value={field.value?.value}
      onChange={field.onChange}
    />
  )
}

export default FontFamilySelectInput
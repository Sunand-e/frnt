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
  console.log('field.value')
  console.log(field.value)
  return (
    <FontFamilySelect
      value={field.value?.value}
      onChange={field.onChange}
    />
  )
}

export default FontFamilySelectInput
import { useController } from "react-hook-form"
import FontFamilySelect from "./FontFamilySelect";

interface FontFamilySelectInputProps {
  control?: any;
  name?: string;
  label?: string;
}

const FontFamilySelectInput = ({name, control, label}: FontFamilySelectInputProps) => {
  
  const { field } = useController({
    control,
    name
  });
  
  return (
    <label className={`block`}>
      { label && (
        <span className="text-sm font-medium text-gray-700">{ label }</span>
      )}
      <FontFamilySelect
        value={field.value?.value}
        onChange={field.onChange}
      />
    </label>
  )
}

export default FontFamilySelectInput
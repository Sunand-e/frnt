import ColorPicker from "./ColorPicker";
import { useController } from "react-hook-form"

const ColorPickerInput = ({
  name,
  control,
  clearOrReset='clear',
  defaultValue='',
  label=null,
  showAlpha=true
}) => {
  
  const {
    field
  } = useController({
    name,
    control,
  })
  return (
    <ColorPicker
      label={label}
      value={field.value}
      onChange={field.onChange}
      clearOrReset={clearOrReset}
      defaultValue={defaultValue}
    />
  )
}

export default ColorPickerInput
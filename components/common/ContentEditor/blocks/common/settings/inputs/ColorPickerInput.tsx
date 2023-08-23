import ColorPicker from "./ColorPicker";
import { useController } from "react-hook-form"

const ColorPickerInput = ({
  name,
  control,
  label=null
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
    />
  )
}

export default ColorPickerInput
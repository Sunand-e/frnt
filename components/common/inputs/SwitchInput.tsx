import { useController } from "react-hook-form"
import { Switch } from "./Switch"

export const SwitchInput = ({
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
    <Switch
      label={label}
      value={field.value}
      onChange={field.onChange}
    />
  )
}
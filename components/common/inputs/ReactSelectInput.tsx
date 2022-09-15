import Select from "react-select";
import { Control, useController } from "react-hook-form";

type ReactSelectInputProps = {
  control?: Control
  name?: string
  label?: string
  isMulti?: boolean
  options?
  className?
  onChange?
}

const ReactSelectInput = ({
  control,
  name,
  label,
  onChange,
  ...props
}: ReactSelectInputProps) => {

  const { field } = useController({
    control,
    name,
  });
  
  const value = props.isMulti
    ? props.options.filter(c => field.value?.includes(c.value))
    : props.options.find(c => c.value === field.value)

  const selectProps = {
    ...props,
    // placeholder={<span className="text-main-secondary">{placeholder}</span>}
    value,
    onChange: val => {
      onChange
        ? onChange(val)
        : field.onChange(Array.isArray(val) ? val.map(c => c.value) : val.value)
    },
    className: `${props?.className} w-full`,
    isSearchable: false
  }
  return (
    <>
      { label
        ? <label>{label}<Select {...selectProps} /></label>
        : <Select {...selectProps} />
      }
    </>
  )
}

export default ReactSelectInput

import Select from "react-select";
import { Control, useController } from "react-hook-form";

type ReactSelectInputProps = {
  control?: Control
  name?: string
  label?: string
  selectProps?
}

const ReactSelectInput = ({
  control,
  name,
  label,
  selectProps,
  ...props
}: ReactSelectInputProps) => {

  const { field } = useController({
    control,
    name,
  });
  
  const value = selectProps.isMulti
    ? selectProps.options.filter(c => field.value?.includes(c.value))
    : selectProps.options.find(c => c.value === field.value)

  const allSelectProps = {
    ...selectProps,
    // placeholder={<span className="text-main-dark">{placeholder}</span>}
    value,
    onChange: val => {
      field.onChange(Array.isArray(val) ? val.map(c => c.value) : val.value)
    },
    className: `${selectProps?.className} w-full`,
    isSearchable: false
  }
  return (
    <>
      { label && <label>{label}</label> }
      <Select {...allSelectProps} />
    </>
  )
}

export default ReactSelectInput
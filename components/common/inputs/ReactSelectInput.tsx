import Select from "react-select";
import { Control, useController } from "react-hook-form";

type OptionType = {
  value: string;
  label: string;
};

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
  
  const allSelectProps = {
    ...selectProps,
    // placeholder={<span className="text-main-dark">{placeholder}</span>}
    onChange: val => field.onChange(val.value),
    // value: options.find(c => c.value === field.value)
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
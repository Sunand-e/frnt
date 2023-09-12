import Select from "react-select";
import { Control, useController } from "react-hook-form";
import { StylesConfig, StylesProps } from "react-select/dist/declarations/src/styles";
import classNames from "../../../utils/classNames";
import ReactSelect from "./ReactSelect";

type ReactSelectInputProps = {
  control?: Control
  name?: string
  label?: string
  isMulti?: boolean
  slim?: boolean
  styles?: StylesConfig
  options?
  className?
  onChange?
}

const ReactSelectInput = ({
  control,
  name,
  label,
  onChange,
  className,
  slim=false,
  styles=null,
  ...props
}: ReactSelectInputProps) => {

  const { field } = useController({
    control,
    name,
  });
  
  const value = props.isMulti
    ? props.options.filter(c => field.value?.includes(c.value))
    : props.options.find(c => c.value === field.value)

  const reactSelectProps = {
    ...props,
    label,
    value,
    slim,
    onChange: val => {
      onChange && onChange(val)
      field.onChange(Array.isArray(val) ? val.map(c => c.value) : val.value)
    },
    className,
    styles
  }

  return (
    <ReactSelect {...reactSelectProps} />
  )
}

export default ReactSelectInput

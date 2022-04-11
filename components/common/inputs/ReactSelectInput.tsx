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
  options: OptionType[]
}

const ReactSelectInput = ({
  control,
  name,
  label,
  options,
  ...props
}: ReactSelectInputProps) => {

  const { field } = useController({
    control,
    name,
  });

  return (
    <>
      { label && <label>{label}</label> }
      <Select
        // placeholder={<span className="text-main-dark">{placeholder}</span>}
        options={options}
        value={options.find(c => c.value === field.value)}
        onChange={val => field.onChange(val.value)}
        // styles={customStyles}
        // components={{ Option: IconOption }}
        // value={null}
        className={`w-full`}
        isSearchable={false}
      />
    </>
  )
}

export default ReactSelectInput
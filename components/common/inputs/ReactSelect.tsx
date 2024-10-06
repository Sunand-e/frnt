import Select, { Props as SelectProps, OnChangeValue, GroupBase } from "react-select";
import { StylesConfig } from "react-select/dist/declarations/src/styles";
import classNames from "../../../utils/classNames";

type OptionType = {
  value: number | string;
  label: string;
};

type ReactSelectProps = {
  value?: OptionType | OptionType[];
  label?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  slim?: boolean;
  styles?: StylesConfig<OptionType>;
  options?: OptionType[];
  className?: string;
  onChange?: (selectedOption: OnChangeValue<OptionType, boolean>) => void;
} & Omit<SelectProps<OptionType>, 'onChange' | 'value' | 'options'>;

const ReactSelect: React.FC<ReactSelectProps> = ({
  label,
  onChange,
  value,
  className,
  isSearchable=false,
  slim=false,
  ...props
}: ReactSelectProps) => {
  
  const customStyles: StylesConfig<any, false, GroupBase<any>> = {
    ...(slim && {
      dropdownIndicator: (provided, state) => {
        return {
          ...provided,
          padding: '0px',
          paddingLeft: '3px',
          paddingTop: '0px',
          paddingRight: '3px',
          paddingDown: '0px',
        };
      }
    }),
    ...props.styles
  };

  const selectProps = {
    ...props,
    // placeholder={<span className="text-main-secondary">{placeholder}</span>}
    onChange,
    value,
    className: classNames(
      className,
      // slim ? 'w-auto': 'w-full',
      slim ? 'w-full': 'w-full',
    ),
    isSearchable,
    styles: {...customStyles}
  }
  return (
    <>
      { label
        ? (
          <label className={classNames(
            slim ? 'flex items-center justify-between space-x-2' : 'block',
          )}>
            
            <span className="text-sm font-medium text-secondary min-w-fit">{ label }</span>
            <Select {...selectProps} />
          </label>
        )
        : <Select {...selectProps} />
      }
    </>
  )
}

export default ReactSelect

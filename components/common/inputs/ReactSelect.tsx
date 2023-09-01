import Select from "react-select";
import { Control, useController } from "react-hook-form";
import { StylesConfig, StylesProps } from "react-select/dist/declarations/src/styles";
import classNames from "../../../utils/classNames";

type ReactSelectProps = {
  value?: any
  label?: string
  isMulti?: boolean
  slim?: boolean
  styles?: StylesConfig
  options?
  className?
  onChange?
}

const ReactSelect = ({
  label,
  onChange,
  value,
  className,
  slim=false,
  ...props
}: ReactSelectProps) => {
  
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
    isSearchable: false,
    styles: {
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
    }
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

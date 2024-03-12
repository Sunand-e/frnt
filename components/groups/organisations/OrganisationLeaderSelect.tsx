import { StylesConfig, StylesProps } from "react-select/dist/declarations/src/styles";
import useGetUsers from "../../../hooks/users/useGetUsers";
import classNames from "../../../utils/classNames";
import ReactSelect from "../../common/inputs/ReactSelect";

type OrganisationLeaderSelectProps = {
  value?: any
  label?: string
  isMulti?: boolean
  slim?: boolean
  styles?: StylesConfig
  options?
  className?
  onChange?
}

const OrganisationLeaderSelect = ({
  label,
  onChange,
  value,
  className,
  slim=false,
  ...props
}: OrganisationLeaderSelectProps) => {
  
  const onChange = (value) => {
    alert('it changed')
    alert(JSON.stringify(value,null,2))
  }
  const { users } = useGetUsers()
  const selectProps = {
    ...props,
    // placeholder={<span className="text-main-secondary">{placeholder}</span>}
    onChange,
    value,
    isSearchable: true,
  }

  return (
    <ReactSelect {...selectProps} />
  )
}

export default OrganisationLeaderSelect

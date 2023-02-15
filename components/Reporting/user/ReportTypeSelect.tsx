import Select from "react-select";

const ReportTypeSelect = ({onSelect, selected}) => {

  const onChange = (type) => {
    onSelect(type)
  }

  const options = [
    {
      label: 'Course report',
      value: 'course',
    },
    {
      label: 'User report',
      value: 'user'
    },
    {
      label: 'Group report',
      value: 'group'
    },
  ]

  const value = options.find(v => v.value === selected)

  const selectProps = {
    options,
    defaultValue: 'course',
    
    getOptionValue: option => option.value,
    getOptionLabel: option => option.label,
    menuPortalTarget: document.body,
    isSearchable: false,
    onChange,
    value,
    styles: {
      menuPortal: base => ({ ...base, zIndex: 9999 }),
      control: (provided, state) => ({
        ...provided,
        minWidth: "240px"
      }),
    },
  }
  return (
    <div className="flex space-x-4">
        <Select {...selectProps} />
    </div>
  )
}

export default ReportTypeSelect
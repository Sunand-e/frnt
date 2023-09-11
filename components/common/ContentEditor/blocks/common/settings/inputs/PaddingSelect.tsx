import Select, { components }  from "react-select";

const paddingOptions = ['0px','10px','20px','30px','40px','50px','60px','70px','80px','90px','100px']

const PaddingSelect = ({side, onSelect, selected, label, styles={}}) => {

  const onChange = (tag) => {
    onSelect(tag)
  }

  const options = paddingOptions.map(option => { 
    return {
      label: option,
      value: option
    }
  })

  const selectedOption = options.filter(o => o.value === selected)

  const selectProps = {
    options,
    defaultValue: selectedOption,
    menuPortalTarget: document.body,
    isSearchable: false,
    onChange,
    styles: { 
      dropdownIndicator: (provided, state) => {
        return {
          ...provided,
          padding: '0px',
          paddingLeft: '3px',
          paddingTop: '0px',
          paddingRight: '3px',
          paddingDown: '0px',
        };
      },
      menuPortal: base => ({ ...base, zIndex: 9999 }),
      control: (provided, state) => ({
        ...provided,
        // minWidth: "240px"
      }),
    },
  }
  return (
    <div className="flex items-center text-sm space-x-1">
      { label && <label>{label}: </label> }
      <Select {...selectProps} />
    </div>
  )
}

export default PaddingSelect
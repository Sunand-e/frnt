import Select from "react-select";

const paddingOptions = ['none','10px','20px','30px','40px','50px','60px','70px','80px','90px','100px']

const PaddingSelect = ({side, onSelect, selected, label, styles={}}) => {

  const onChange = (tag) => {
    onSelect(tag)
  }

  const selectProps = {
    options: paddingOptions.map(option => { 
      return {
        label: option,
        value: option === 'none' ? '0px' : option       
      }
    }),
    defaultValue: selected,
    menuPortalTarget: document.body,
    isSearchable: false,
    onChange,
    styles: { 
      
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
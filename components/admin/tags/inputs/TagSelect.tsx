import Select from "react-select";
import useGetTags from "../../../../hooks/tags/useGetTags"

const TagSelect = ({tagType, onSelect, selected}) => {

  const { tags, loading, error } = useGetTags()
  
  const onChange = (tag) => {
    onSelect(tag)
  }
  
  const selectProps = {
    options: tags && tags.filter(tag => tag.tagType === tagType),
    getOptionLabel: tag => tag.label,
    getOptionValue: tag => tag.label,
    // defaultValue: currentRoles[0],
    value: tags?.find(tag => tag.id === selected) || null,
    placeholder: `Select ${tagType}`,
    menuPortalTarget: document.body,
    isSearchable: false,
    onChange,
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
      
      { tags && (
        <>
          <Select {...selectProps} />
        </>
      )}
    </div>
  )
}

export default TagSelect
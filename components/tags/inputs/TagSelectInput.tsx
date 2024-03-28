import useGetTags from "../../../hooks/tags/useGetTags"
import Select from "react-select";
import { useController } from "react-hook-form";

const TagSelectInput = ({control, name="tags", tagType, label, isMulti=false, onChange=null}) => {

  const { tags, loading, error } = useGetTags()

  const { field } = useController({
    control,
    name,
  })
  
  const value = isMulti ? field.value?.map(({__typename, image, order, ...value}) => value) : field.value

  const options = tags && tags
    .filter(tag => tag.tagType === tagType)
    .map(({contentItems, parent, ...properties}) => properties)

  const selectProps = {
    isMulti,
    options,
    value,
    getOptionValue: option => option.value ?? option.id,
    onChange: val => {
      const newValue = isMulti ? val.map(({__typename, image, order, _deleted, ...value}) => value) : val
      field.onChange(newValue)
      onChange && onChange(newValue)
    },
    className: `w-full`,
    isSearchable: false,
    styles:{ menuPortal: base => ({ ...base, zIndex: 9999 }) },
    ...(typeof window !== 'undefined' ? { menuPortalTarget: document.body } : {})
  }

  return (
    <>
      { tags && (
        <label className={`block z-40`}>
        { label && <span className="text-sm font-medium text-gray-700">{ label }</span> }
        <Select {...selectProps} />
      </label>
      )}
    </>
  )
}

export default TagSelectInput
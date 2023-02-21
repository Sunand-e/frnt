import useGetTags from "../../../hooks/tags/useGetTags"
import Select from "react-select";
import { useController } from "react-hook-form";

const TagSelectInput = ({control, tagType, label}) => {

  const { tags, loading, error } = useGetTags()

  const { field } = useController({
    control,
    name: 'tags',
  })
  
  const selectProps = {
    isMulti: true,
    options: tags && tags.filter(tag => tag.tagType === tagType),
    value: field.value?.map(({__typename, image, order, ...value}) => value),
    getOptionValue: option => option.value ?? option.id,
    onChange: val => {
      field.onChange(val.map(({__typename, image, order, _deleted, ...value}) => value))
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
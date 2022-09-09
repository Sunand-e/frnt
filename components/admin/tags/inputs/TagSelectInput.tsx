import useGetTags from "../../../../hooks/tags/useGetTags"
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
    value: field.value?.map(({__typename, image, ...value}) => value),
    getOptionValue: option => option.value ?? option.id,
    onChange: val => {
      field.onChange(val.map(({__typename, image, ...value}) => value))
    },
    className: `w-full`,
    isSearchable: false
  }

  return (
    <>
      { tags && (
        <label className={`block`}>
        { label && <span className="text-sm font-medium text-gray-700">{ label }</span> }
        <Select {...selectProps} />
      </label>
      )}
    </>
  )
}

export default TagSelectInput
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
    value: field.value,
    getOptionValue: option => option.value ?? option.id,
    onChange: val => {
      field.onChange(val.map(({__typename, image, ...value}) => value))
    },
    className: `w-full`,
    isSearchable: false
  }

  return (
    <>
      { tags && (label
        ? <label>{label}<Select {...selectProps} /></label>
        : <Select {...selectProps} />
      )}
    </>
  )
}

export default TagSelectInput
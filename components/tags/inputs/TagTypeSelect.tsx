import ReactSelectInput from "../../common/inputs/ReactSelectInput"

const TagTypeSelect = ({control}) => {

  const options = [
    { value: 'category', label: 'Category'},
    { value: 'tag', label: 'Tag'},
    { value: 'topic', label: 'Topic'},
  ]
  return (
    <ReactSelectInput
      label="Tag type"
      control={control}
      name="tagType"
      options={options}
    />
  )
}

export default TagTypeSelect
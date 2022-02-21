import Select, { components } from "react-select";
import { PlusCircle } from '@styled-icons/heroicons-solid/PlusCircle'

const options = [
  { value: "Text", label: "Text", icon: "Text" },
  { value: "Video", label: "Video", icon: "Video" },
  { value: "Image", label: "Image", icon: "Image" },
  { value: "Document", label: "Document", icon: "Document" },
  { value: "SCORM", label: "SCORM", icon: "SCORM" },
  { value: "Assignment", label: "Assignment", icon: "Assignment" },
  { value: "Freeform", label: "Freeform", icon: "Freeform" },
  { value: "Quiz", label: "Quiz", icon: "Quiz" },
]

const { Option } = components;
const IconOption = props => (
  <Option {...props}>
    <PlusCircle />
    {props.data.label}
  </Option>
);

const SelectNewCourseItem = ({sectionId}) => {
  return (
    <Select
      defaultValue={options[0]}
      options={options}
      components={{ Option: IconOption }}
    />
  )
}

export default SelectNewCourseItem
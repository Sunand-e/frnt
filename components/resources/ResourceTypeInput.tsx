import { Control, useController } from "react-hook-form";
import { useContext, useState } from "react";
import { ModalContext } from "../../context/modalContext";
import AudioSelector from "../common/inputs/AudioSelector";
import DocumentSelectorInput from "../common/inputs/DocumentSelectorInput";
import DocumentSelector from "../common/inputs/DocumentSelector";
import ImageDropzone from "../common/inputs/ImageDropzone";

type ResourceTypeInputProps = { 
  control?: Control;
  initialValue?;
  label?: string;
  name?: string;
  type,
}

const ResourceTypeInput = ({
  control,
  name,
  label,
  initialValue=null,
  type,
}: ResourceTypeInputProps) => {

  const { closeModal } = useContext(ModalContext)

  const [value, setValue] = useState(initialValue)

  const { field } = useController({
    control,
    name
  });

  const handleChange = (newValue) => {
    setValue(newValue)
    field.onChange(newValue)
    closeModal()
  }

  const renderInput = (type)  => {
    switch(type.value) {
      case 'document':
        return <DocumentSelector file={value} onSelect={handleChange} onRemove={() => handleChange(null)}/>;
      case 'video':
        return 'bar';
      case 'image':
        return <ImageDropzone initialValue={value?.location} onDrop={handleChange} />;
      case 'audio':
        return <AudioSelector url={value?.location} onSelect={handleChange} />;
      case 'link':
        return 'bar';
      default:
        return 'Something went wrong. Please go back and try again.';
    }
  }

  return (
    <div>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          {label}
        </span>
      </label>
      {renderInput(type)}
    </div>
  )
}

export default ResourceTypeInput
import { Control, useController } from "react-hook-form";
import { RichTextEditor } from '@mantine/rte';
import { useContext, useState } from "react";
import DocumentSelector from "./DocumentSelector";
import { ModalContext } from "../../../context/modalContext";

type DocumentSelectorInputProps = { 
  control?: Control;
  initialValue?;
  label?: string;
  name?: string;
}

const DocumentSelectorInput = ({
  control,
  name,
  label,
  initialValue=null,
}: DocumentSelectorInputProps) => {

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
  return (
    <div>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          {label}
        </span>
      </label>
      <DocumentSelector file={value} onSelect={handleChange} />
    </div>
  )
}

export default DocumentSelectorInput
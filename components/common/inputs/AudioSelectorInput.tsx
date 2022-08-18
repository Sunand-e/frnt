import { Control, useController } from "react-hook-form";
import { RichTextEditor } from '@mantine/rte';
import { useContext, useState } from "react";
import AudioSelector from "./AudioSelector";
import { ModalContext } from "../../../context/modalContext";

type AudioSelectorInputProps = { 
  control?: Control;
  initialValue?;
  label?: string;
  name?: string;
}

const AudioSelectorInput = ({
  control,
  name,
  label,
  initialValue=null,
}: AudioSelectorInputProps) => {

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
      <AudioSelector url={value.location} onSelect={handleChange} />
    </div>
  )
}

export default AudioSelectorInput
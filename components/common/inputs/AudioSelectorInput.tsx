import { Control, useController } from "react-hook-form";
import AudioSelector from "./AudioSelector";
import { closeModal } from "../../../stores/modalStore";
import { useState } from "react";

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
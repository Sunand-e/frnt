import { Control, useController } from "react-hook-form";
// import { RichTextEditor } from '@mantine/rte';
import { useState } from "react";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(
	() => {
		return import('@mantine/rte');
	},
	{ ssr: false }
);

type RTEInputProps = { 
  control?: Control;
  name?: string;
  label?: string;
  initialValue?;
}

const RTEInput = ({
  control,
  name,
  label,
  initialValue=null,
}: RTEInputProps) => {

  const [value, setValue] = useState(initialValue)

  const { field } = useController({
    control,
    name
  });

  const handleChange = (newValue) => {
    setValue(newValue)
    field.onChange(newValue)
  }

  return (
    <div>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          {label}
        </span>
      </label>
      <RichTextEditor value={value} onChange={handleChange} />
    </div>
  )
}

export default RTEInput
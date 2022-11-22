import { Control, useController } from "react-hook-form";
import { Editor } from '@mantine/rte';
import { useEffect, useRef, useState } from "react";
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

  
  const editorRef = useRef<Editor>();
  
  useEffect(() => {
    console.log('editorRef')
    console.log(editorRef)
    // editorRef.current.focus();
  }, []);
  

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
    <>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          {label}
        </span>
      </label>
      <RichTextEditor ref={editorRef} id="rte" value={value}
      onChange={handleChange} className="flex-grow z-0" />
    </>
  )
}

export default RTEInput
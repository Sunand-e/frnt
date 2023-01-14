import { Control, useController } from "react-hook-form";
import { useContext, useState } from "react";
import MediaLibrary from "../media/MediaLibrary";
import Button from "../common/Button";
import { closeModal, handleModal } from "../../stores/modalStore";

type ResourceFileInputProps = { 
  control?: Control;
  label?: string;
  type,
  setType
}

const ResourceFileInput = ({
  control,
  label,
  setType,
}: ResourceFileInputProps) => {
  
  const handleChange = (newValue) => {
    field.onChange(newValue)
    setType(newValue?.mediaType)
    closeModal()
  }

  const openMediaLibrary = () => {
    handleModal({
      title: `Choose a file`,
      content: <MediaLibrary typeFilter={['document']} onItemSelect={handleChange} />,
      size: 'lg'
    })
  }
  

  const { field } = useController({
    control,
    name: 'resource'
  });

  return (
    <div>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          {label}
        </span>
      </label>
      <div className={'text-center'}>
        <Button onClick={openMediaLibrary}>Select a resource file</Button>
      </div>
    </div>
  )
}

export default ResourceFileInput
import { useContext, useState } from "react";
import { Control, useController } from "react-hook-form";
import { closeModal } from "../../../stores/modalStore";
import classNames from "../../../utils/classNames";
import ImageSelectFromLibrary from "../ContentEditor/ImageSelectFromLibrary";

type ImageSelectInputProps = { 
  control?: Control;
  src?: string;
  origImage?;
  onSelect?;
  label?: string;
  placeholder?: string;
  buttonText?: string;
  valueAsObject?: boolean;
  isButtonAlwaysVisible?: boolean;
  name?: string;
  className?: string;
}

const ImageSelectInput = ({
  placeholder,
  buttonText,
  control,
  name,
  origImage,
  onSelect,
  className='',
  valueAsObject=false,
  isButtonAlwaysVisible=true
}: ImageSelectInputProps) => {

  const { field } = useController({
    control,
    name
  });

  const [image, setImage] = useState(origImage);

  const handleSelect = image => {
    const value = valueAsObject ? image : image?.id
    field.onChange(value)
    setImage(image)
    onSelect ? onSelect(value) : closeModal()
  }

  return (
    <>
      <ImageSelectFromLibrary
        className={classNames(className)}
        placeholder={placeholder}
        src={image?.location}
        buttonText={buttonText}
        onSelect={handleSelect}
        isButtonAlwaysVisible={isButtonAlwaysVisible}
      />
    </>
  )
}

export default ImageSelectInput
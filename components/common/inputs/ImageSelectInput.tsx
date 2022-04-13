import { useState } from "react";
import { Control, useController } from "react-hook-form";
import ImageSelect from "../../ContentEditor/ImageSelect";

type ImageSelectInputProps = { 
  control?: Control;
  src?: string;
  label?: string;
  placeholder?: string;
  buttonText?: string;
  name?: string;
}

const ImageSelectInput = ({
  placeholder,
  buttonText,
  control,
  name,
  label
}: ImageSelectInputProps) => {

  const { field } = useController({
    control,
    name
  });

  const [image, setImage] = useState({id: null, location: null});

  const handleSelect = image => {
    field.onChange(image.id)
    setImage(image)
  }

  return (
    <>
      <ImageSelect
        placeholder={placeholder}
        src={image.location}
        buttonText={buttonText}
        onSelect={handleSelect}
        isButtonAlwaysVisible={true}
      />
    </>
  )
}

export default ImageSelectInput
import { useContext, useState } from "react";
import { Control, useController } from "react-hook-form";
import { ModalContext } from "../../../context/modalContext";
import ImageSelectFromLibrary from "../ContentEditor/ImageSelectFromLibrary";

type ImageSelectInputProps = { 
  control?: Control;
  src?: string;
  origImage?;
  onSelect?;
  isModal?: boolean;
  label?: string;
  placeholder?: string;
  buttonText?: string;
  isButtonAlwaysVisible?: boolean;
  name?: string;
}

const ImageSelectInput = ({
  placeholder,
  buttonText,
  control,
  name,
  origImage,
  onSelect,
  isButtonAlwaysVisible=true
}: ImageSelectInputProps) => {

  const { field } = useController({
    control,
    name
  });

  const { closeModal } = useContext(ModalContext)

  const [image, setImage] = useState(origImage);

  const handleSelect = image => {
    field.onChange(image.id)
    setImage(image)
    onSelect ? onSelect(image) : closeModal()
  }

  return (
    <>
      <ImageSelectFromLibrary
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
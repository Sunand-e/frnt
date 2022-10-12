import { useContext } from "react"
import { ModalContext } from "../../../context/modalContext"
import MediaLibrary from "../../media/MediaLibrary";
import ImageSelect from "./ImageSelect";

type ImageSelectFromLibraryProps = { 
  src?: string;
  placeholder?: string;
  buttonText?: string;
  onSelect?: (image) => void;
  isButtonAlwaysVisible?: boolean;
}

const ImageSelectFromLibrary = ({
  placeholder, 
  src,
  buttonText,
  isButtonAlwaysVisible,
  onSelect
}: ImageSelectFromLibraryProps) => {

  const { handleModal } = useContext(ModalContext)

  const handleClick = () => {
    handleModal({
      title: `Choose image`,
      content: <MediaLibrary onItemSelect={onSelect} typeFilter={['image']} />,
      size: 'lg'
    })
  }

  return (
    <ImageSelect 
      placeholder={placeholder}
      src={src}
      buttonText={buttonText}
      isButtonAlwaysVisible={isButtonAlwaysVisible}
      onClick={handleClick}
    />
  )
}

export default ImageSelectFromLibrary

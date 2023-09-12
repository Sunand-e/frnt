import { useContext } from "react"
import { closeModal, handleModal } from "../../../stores/modalStore";
import MediaLibrary from "../../media/MediaLibrary";
import ImageSelect from "./ImageSelect";

type ImageSelectFromLibraryProps = { 
  src?: string;
  label?: string;
  placeholder?: string;
  buttonText?: string;
  onSelect?: (image) => void;
  isButtonAlwaysVisible?: boolean;
  className?: string;
}

const ImageSelectFromLibrary = ({
  placeholder, 
  label,
  src,
  buttonText,
  isButtonAlwaysVisible,
  className = '',
  onSelect
}: ImageSelectFromLibraryProps) => {

  const handleClick = () => {
    handleModal({
      title: `Choose image`,
      content: <MediaLibrary onItemSelect={item => {
        onSelect(item)
        closeModal()
      }} typeFilter={['image']} />,
      size: 'lg'
    })
  }

  return (
    <>
      { label && (
          <label>
            <span className="text-sm font-medium text-secondary">{ label }</span>
          </label>
      )}
      <ImageSelect 
        placeholder={placeholder}
        src={src}
        buttonText={buttonText}
        isButtonAlwaysVisible={isButtonAlwaysVisible}
        onClick={handleClick}
        onClear={() => onSelect(null)}
        className={className}
      />
    </>
  )
}

export default ImageSelectFromLibrary

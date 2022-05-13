import { useContext } from "react"
import { ModalContext } from "../../context/modalContext"
import MediaLibrary from "../MediaLibrary/MediaLibrary";

type ImageSelectProps = { 
  src?: string;
  placeholder?: string;
  buttonText?: string;
  onSelect?: (image) => void;
  isButtonAlwaysVisible?: boolean;
}

const ImageSelect = ({
  placeholder, 
  src,
  buttonText,
  onSelect,
  isButtonAlwaysVisible
}: ImageSelectProps) => {

  const { handleModal } = useContext(ModalContext)

  const selectImageModal = () => {
    handleModal({
      title: `Choose image`,
      content: <MediaLibrary onItemSelect={onSelect} typeFilter={['image']} />,
      size: 'lg'
    })
  }

  return (
    <div className={`relative`}>
      <img
        className={`block max-w-full px-1 w-full borderRadius[3px] object-cover boxShadow[0 0 0 1px rgb(59,130,249)]`}
        src={src || placeholder || '/images/image-block-placeholder.jpg'}
      />
      <div className={`absolute w-full h-full top-0 left-0 flex items-center justify-center ${isButtonAlwaysVisible ? '' : 'opacity-0 hover:opacity-100'}`}>
        <a className="cursor-pointer bg-main-dark bg-opacity-60 text-white py-1 px-4 rounded hover:bg-opacity-90" onClick={selectImageModal}>{buttonText ?? 'Choose image'}</a>
      </div>
    </div>
  )
}

export default ImageSelect
import classNames from "../../../utils/classNames";
import {Trash} from '@styled-icons/heroicons-outline/Trash'

type ImageSelectProps = { 
  src?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
  onLoad?: (e) => void;
  onClick?: (e) => void;
  onClear?: (e) => void;
  isButtonAlwaysVisible?: boolean;
}

const ImageSelect = ({
  placeholder, 
  src,
  buttonText,
  onClick,
  onLoad,
  onClear,
  className='',
  isButtonAlwaysVisible
}: ImageSelectProps) => {
  const showButton = !src || isButtonAlwaysVisible;
  return (
    <div className={classNames(`relative`, className)}>
      <img
      onLoad={onLoad}
        className={`block max-w-full px-1 w-full borderRadius[3px] object-cover boxShadow[0 0 0 1px rgb(59,130,249)]`}
        src={src || placeholder || '/images/placeholder-image.png'}
      />
      <div className={`absolute w-full h-full top-0 left-0 flex items-center justify-center ${showButton ? '' : 'opacity-0 hover:opacity-100'}`}>
        <a className="cursor-pointer bg-main-secondary bg-opacity-60 text-white py-1 px-4 rounded hover:bg-opacity-90" onClick={onClick}>{buttonText ?? 'Choose image'}</a>
      </div>
      { onClear && src && (
        <div className={`absolute p-2 w-12 h-12 flex items-center justify-center top-0 right-0 'opacity-60 hover:opacity-100'}`}>
          <Trash className={`w-6 cursor-pointer hover:w-14 text-red-800`} onClick={onClear} />
        </div>
      )}
    </div>
  )
}

export default ImageSelect

import ImageSelectFromLibrary from "../../ImageSelectFromLibrary"
import useBlockEditor from "../../useBlockEditor"

export const ImageSettings = ({block}) => {

  const { updateBlockProperties } = useBlockEditor(block)

  const setImage = image => {
    updateBlockProperties(block, {
      url: image?.location,
      fileName: image?.fileName,
      mediaId: image?.id,
    })
  }
  
  return (
    <ImageSelectFromLibrary
      label="Image file"
      placeholder="d"
      src={block.properties.url}
      buttonText="Select image"
      isButtonAlwaysVisible={true}
      className="h-36 overflow-hidden"
      onSelect={setImage}
    />
  );
}

export default ImageSettings
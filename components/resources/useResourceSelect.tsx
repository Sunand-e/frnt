import { useController } from "react-hook-form";
import { closeModal, handleModal } from "../../stores/modalStore";
import UrlEntry from "../common/inputs/UrlEntry";
import VideoSelector from "../common/inputs/VideoSelector";
import MediaLibrary from "../media/MediaLibrary";

const useResourceSelect = (control) => {

  const { field: typeField } = useController({ control, name: 'type' })
  const { field: titleField } = useController({ control, name: 'title' })
  
  const {field: resourceField} = useController({
    control,
    name: 'resourceValue'
  })
  
  const handleResourceSelect = (resource) => {
    resourceField.onChange(resource)
    closeModal()
  }

  const openMediaLibrary = (type) => {
    handleModal({
      title: type.chooseLabel,
      content: <MediaLibrary typeFilter={[type.name]} onItemSelect={handleResourceSelect} />,
      size: 'lg'
    })
  }

  const openVideoSelector = () => {
    handleModal({
      title: `Video URL`,
      content: <VideoSelector onAddVideo={handleResourceSelect} />,
      size: 'lg'
    })
  }

  const openUrlInput = () => {
    handleModal({
      title: `Enter a URL`,
      content: <UrlEntry onAddLink={handleResourceSelect} />,
      size: 'lg'
    })
  }

  const handleTypeSelect = (type) => {
    typeField.onChange(type)
    switch(type.name) {
      case 'document':
      case 'image':
      case 'audio':
        openMediaLibrary(type)
        break;
      case 'video':
        openVideoSelector()
        break;
      case 'link':
        openUrlInput()
        break;
    }
  }

  return {
    handleTypeSelect
  }
}

export default useResourceSelect
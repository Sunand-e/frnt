import { useContext } from "react";
import { useController } from "react-hook-form";
import { ModalContext } from "../../context/modalContext";
import UrlEntry from "../common/inputs/UrlEntry";
import VideoSelector from "../common/inputs/VideoSelector";
import MediaLibrary from "../MediaLibrary/MediaLibrary";
import { resourceTypes } from "./resourceTypes";

const ResourceTypeSelector = ({control}) => {

  const { handleModal, closeModal } = useContext(ModalContext)

  const { field: typeField } = useController({ control, name: 'type' })
  
  const {field: resourceField} = useController({
    control,
    name: 'resourceValue'
  })
  
  const openMediaLibrary = (type) => {
    let modalTitle
    switch(type.name) {
      case 'image':
        modalTitle = 'Choose an image'
      case 'audio':
        modalTitle = 'Choose an audio file'
      case 'document':
        modalTitle = 'Choose a document'
      default:
        modalTitle = 'Choose a file'
    }
    
    handleModal({
      title: modalTitle,
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
      title: `Choose a file`,
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

  const handleResourceSelect = (resource) => {
    resourceField.onChange(resource)
    closeModal()
  }

  const typeBoxes = Object.entries(resourceTypes).map(([name, type], index) => (
    <div
      key={index}
      onClick={(e) => handleTypeSelect({...type, name})}
      className="flex-grow flex flex-col cursor-pointer text-main-secondary items-center hover:text-main h-18 text-xs"
    >
      { type.icon && <type.icon className="h-full text-main-secondary/80 hover:text-main-secondary"/> }
      <span className="text-center">
        {type.label}
      </span>
    </div>
  ))

  return (
    // <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div className="flex flex-col items-center">
      <p className="mb-3">Choose a resource type:</p>
      <div className="bg-main bg-opacity-10 p-4 max-w-lg w-full border-2 border-gray-300 border-dashed rounded-md">
        <div className="flex justify-between">{typeBoxes}</div>
      </div>
    </div>
  )
}

export default ResourceTypeSelector
import { resourceTypes } from "./resourceTypes";
import useResourceSelect from "./useResourceSelect";

const ResourceTypeSelector = ({control}) => {

  const { handleTypeSelect } = useResourceSelect(control)

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
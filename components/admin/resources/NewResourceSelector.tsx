import { useController } from "react-hook-form";
import useCreateResource from "../../../hooks/resources/useCreateResource";
import { resourceTypes } from "../../resources/resourceTypes";

const resourceTypesArray = Object.keys(resourceTypes).map(key => {
  return {
    ...resourceTypes[key],
    value: key
  }
});

const NewResourceSelector = ({
  onSelect = (type) => null
}) => {

  const typeBoxes = resourceTypesArray.map(type => (
    <div 
      onClick={(e) => onSelect(type)}
      className="flex flex-col cursor-pointer text-main-secondary items-center hover:text-main w-32 text-xs"
    >
      { type.icon && <type.icon className="w-8"/> }
      <span className="text-center">
        {type.label}
      </span>
    </div>
  ))

  return (
    <div className="flex flex-col items-center">
      <p>Choose a content type:</p>
      <div className="bg-main bg-opacity-10 py-4 border border-1 border-main">
        <div className="flex">{typeBoxes}</div>
      </div>
    </div>
  )
}

export default NewResourceSelector

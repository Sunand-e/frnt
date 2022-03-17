import { useController } from "react-hook-form";
import useCreateLibraryItem from "../../../hooks/libraryItems/useCreateLibraryItem";
import { libraryItemTypes } from "./libraryItemTypes";

const libraryItemTypesArray = Object.keys(libraryItemTypes).map(key => {
  return {
    ...libraryItemTypes[key],
    value: key
  }
});

const NewLibraryItemSelector = ({
  control,
  name,
  onSelect = () => null
}) => {

  const { field } = useController({
    control,
    name
  });

  const handleNewLibraryItemButton = ({value, content}) => {
    
    field.onChange(value)
    // createLibraryItem({content, contentType: value})
    onSelect()
  }


  const typeBoxes = libraryItemTypesArray.map(type => (
    <div 
      onClick={(e) => handleNewLibraryItemButton(type)}
      className="flex flex-col cursor-pointer text-main-dark items-center hover:text-main w-32 text-xs"
    >
    { type.icon && <type.icon className="w-8"/> }
    <span className="text-center">
      {type.label}
    </span>
    </div>
  ))

  return (
    <>
      
      <p>Choose a content type:</p>
    <div className="bg-main bg-opacity-10 py-4 border border-1 border-main">
      <div className="flex">{typeBoxes}</div>
    </div>
    </>
  )
}

export default NewLibraryItemSelector
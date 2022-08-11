import useGetLibraryItems from "../../../../hooks/libraryItems/useGetLibraryItems";
import DualListBoxInput from "../../../common/inputs/DualListBoxInput"

const SharedResourcesInput = ({control}) => {

  const { libraryItems } = useGetLibraryItems();
  
  const libraryItemsOptions = libraryItems?.edges?.map(({node: libraryItem}) => {
    return { value: libraryItem.id, label: libraryItem.title }
  })

  return (
    <>
      { libraryItems && (
        <DualListBoxInput
          label="Shared resources"
          control={control}
          name="sharedResourceIds"
          options={libraryItemsOptions}
          lang={{
            availableHeader: 'Available',
            selectedHeader: 'Shared',
          }}
        />
      )}
    </>
  )
}

export default SharedResourcesInput
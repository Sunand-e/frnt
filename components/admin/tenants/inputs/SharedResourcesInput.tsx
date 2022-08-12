import useGetResources from "../../../../hooks/resources/useGetResources";
import DualListBoxInput from "../../../common/inputs/DualListBoxInput"

const SharedResourcesInput = ({control}) => {

  const { libraryItems } = useGetResources();
  
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
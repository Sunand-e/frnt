import useGetResources from "../../../../hooks/resources/useGetResources";
import DualListBoxInput from "../../../common/inputs/DualListBoxInput"

const SharedResourcesInput = ({control}) => {

  const { resources } = useGetResources();
  
  const resourcesOptions = resources?.edges?.map(({node: libraryItem}) => {
    return { value: libraryItem.id, label: libraryItem.title }
  })

  return (
    <>
      { resources && (
        <DualListBoxInput
          label="Shared resources"
          control={control}
          name="sharedResourceIds"
          options={resourcesOptions}
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
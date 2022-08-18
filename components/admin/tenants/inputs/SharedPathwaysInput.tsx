import useGetPathways from "../../../../hooks/pathways/useGetPathways";
import DualListBoxInput from "../../../common/inputs/DualListBoxInput"

const SharedPathwaysInput = ({control}) => {

  const { pathways } = useGetPathways();
  
  const pathwaysOptions = pathways?.edges?.map(({node: pathway}) => {
    return { value: pathway.id, label: pathway.title }
  })

  return (
    <>
      { pathways && (
        <DualListBoxInput
          label="Shared pathways"
          control={control}
          name="sharedPathwayIds"
          options={pathwaysOptions}
          lang={{
            availableHeader: 'Available',
            selectedHeader: 'Shared',
          }}
        />
      )}
    </>
  )
}

export default SharedPathwaysInput
import useGetPathways from "../../../hooks/pathways/useGetPathways";
import DualListBoxInput from "../../common/inputs/DualListBoxInput"

const AssignedPathwaysInput = ({control}) => {

  const { pathways } = useGetPathways();
  // Get array of {value: label:} objects from fetched pathways object 
  const pathwaysOptions = pathways?.edges?.map(({node}) => {
    return { value: node.id, label: node.title }
  })

  return (
    <>
      { pathways && (
        <DualListBoxInput
          label="Assigned pathways"
          control={control}
          name="assignedPathwayIds"
          options={pathwaysOptions}
          lang={{
            availableHeader: 'Available pathways',
            selectedHeader: 'Selected pathways',
          }}
        />
      )}
    </>
  )
}

export default AssignedPathwaysInput
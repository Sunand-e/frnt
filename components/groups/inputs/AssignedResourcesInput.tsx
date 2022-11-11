import useGetResources from "../../../hooks/resources/useGetResources";
import DualListBoxInput from "../../common/inputs/DualListBoxInput"

const AssignedResourcesInput = ({control}) => {

  const { resources } = useGetResources();
  // Get array of {value: label:} objects from fetched resources object 
  const resourcesOptions = resources?.edges?.map(({node: course}) => {
    return { value: course.id, label: course.title }
  })

  return (
    <>
      { resources && (
        <DualListBoxInput
          label="Assigned resources"
          control={control}
          name="enrolledCourseIds"
          options={resourcesOptions}
          lang={{
            availableHeader: 'Available resources',
            selectedHeader: 'Selected resources',
          }}
        />
      )}
    </>
  )
}

export default AssignedResourcesInput
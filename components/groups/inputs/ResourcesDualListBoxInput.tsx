import useGetResources from "../../../hooks/resources/useGetResources";
import DualListBoxInput from "../../common/inputs/DualListBoxInput"

const ResourcesDualListBoxInput = ({control, name='resourceIds', label='Resources'}) => {

  const { resources } = useGetResources();

  const resourcesOptions = resources?.edges?.map(({node}) => {
    return { value: node.id, label: node.title }
  })

  return (
    <>
      { resources && (
        <DualListBoxInput
          label={label}
          control={control}
          name={name}
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

export default ResourcesDualListBoxInput
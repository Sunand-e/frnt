import useGetCapabilities from "../../../hooks/capabilities/useGetCapabilities"
import DualListBoxInput from "../../common/inputs/DualListBoxInput"

const RoleCapabilitiesInput = ({control}) => {

  const { capabilities } = useGetCapabilities();
  
  const capabilitiesOptions = capabilities?.map(capability => {
    return { value: capability.id, label: capability.name }
  })

  return (
    <>
      { capabilities && (
        <DualListBoxInput
          label="Assigned capabilities"
          control={control}
          name="capabilityIds"
          options={capabilitiesOptions}
          lang={{
            availableHeader: 'Available capabilities',
            selectedHeader: 'Selected capabilities',
          }}
        />
      )}
    </>
  )
}

export default RoleCapabilitiesInput
import useGetPathways from "../../../hooks/pathways/useGetPathways";
import DualListBoxInput from "../../common/inputs/DualListBoxInput"

const PathwaysDualListBoxInput = ({control, name='courseIds', label='Courses'}) => {

  const { pathways } = useGetPathways();

  const pathwaysOptions = pathways?.edges?.map(({node}) => {
    return { value: node.id, label: node.title }
  })

  return (
    <>
      { pathways && (
        <DualListBoxInput
          label={label}
          control={control}
          name={name}
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

export default PathwaysDualListBoxInput
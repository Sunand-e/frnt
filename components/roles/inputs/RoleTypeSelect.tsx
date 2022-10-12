import ReactSelectInput from "../../common/inputs/ReactSelectInput"

const RoleTypeSelect = ({control}) => {

  const options = [
    { value: 'tenant_role', label: 'Global'},
    // { value: 'content_item_role', label: 'Item Role'},
    { value: 'group_role', label: 'Group'},
  ]
  return (
    <ReactSelectInput
      label="Role type"
      control={control}
      name="roleType"
      options={options}
    />
  )
}

export default RoleTypeSelect
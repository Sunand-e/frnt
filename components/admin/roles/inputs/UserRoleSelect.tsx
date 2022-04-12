import useGetRoles from "../../../../hooks/roles/useGetRoles"
import ReactSelectInput from "../../../common/inputs/ReactSelectInput"

const UserRoleSelect = ({control}) => {

  const { roles, loading, error } = useGetRoles()

  // alert(JSON.stringify(roles,null,2))

  const options = roles && roles.filter(role => role.roleType === 'tenant_role').map(role => {
    return {
      value: role.id,
      label: role.name
    }
  })

  return (
    <ReactSelectInput
      label="Roles"
      control={control}
      name="roles"
      selectProps={{
        isMulti: true,
        options
      }}
    />
  )
}

export default UserRoleSelect
import useGetRoles from "../../../../hooks/roles/useGetRoles"
import ReactSelectInput from "../../../common/inputs/ReactSelectInput"

const UserRoleSelect = ({control}) => {

  const { roles, loading, error } = useGetRoles()

  const options = roles && roles.filter(role => role.roleType === 'tenant_role').map(role => {
    return {
      value: role.id,
      label: role.name
    }
  })

  return (
    <>
      { roles && 
        <ReactSelectInput
          label="Roles"
          control={control}
          name="role_ids"
          selectProps={{
            isMulti: true,
            options
          }}
        />
      }
    </>
    
  )
}

export default UserRoleSelect
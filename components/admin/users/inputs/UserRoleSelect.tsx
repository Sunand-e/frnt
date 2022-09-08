import useGetRoles from "../../../../hooks/roles/useGetRoles"
import ReactSelectInput from "../../../common/inputs/ReactSelectInput"

const UserRoleSelect = ({control, roleType}) => {

  const { roles, loading, error } = useGetRoles()

  const options = roles && roles.filter(
    role => role.roleType === roleType
    ).filter(
    role => role.name !== 'User'
  ).map(role => {
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
          isMulti={true}
          options={options}
        />
      }
    </>
    
  )
}

export default UserRoleSelect
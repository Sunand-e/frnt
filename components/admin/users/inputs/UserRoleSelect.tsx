import { useController } from "react-hook-form";
import useGetRoles from "../../../../hooks/roles/useGetRoles"
import Button from "../../../Button";
import ReactSelectInput from "../../../common/inputs/ReactSelectInput"

const UserRoleSelect = ({control, roleType}) => {

  const { roles, loading, error } = useGetRoles()

  const { field } = useController({
    control,
    name: 'role_ids',
  });

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
          onChange={ selectedRoles => {
            const newSelected = [
              ...selectedRoles,
              ...(!selectedRoles.length ? [
                options.find(o => o.label === 'Learner')
              ] : [])
            ]
            field.onChange(newSelected.map(r => r.value))
          }}
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
import Select from "react-select";
import useGetRoles from "../../../hooks/roles/useGetRoles";

const UserRoleSelectCell = ({cell, roleType, onChange}) => {

  const { loading: rolesLoading, error: rolesError, roles } = useGetRoles()

  // const currentRoles = cell.row.original.roles;
  const currentRole = cell.row.original.roles[0];

  const handleChange = (role) => {
    if(currentRole.name !== role.name) {
      onChange(role)
    }
  }

  const selectProps = {
    options: roles && roles.filter(role => role.roleType === roleType && role.name !== 'User'),
    getOptionLabel: role => role.name,
    getOptionValue: role => role.name,
    defaultValue: currentRole,
    menuPortalTarget: document.body,
    isSearchable: false,
    onChange: handleChange,
    styles: { 
      menuPortal: base => ({ ...base, zIndex: 9999 }),
      control: (provided, state) => ({
        ...provided,
        border: 'none',
        background: 'transparent',
        marginLeft: '-8px'
      }),
    },
  }
  return (
    <div className="flex space-x-4">
      { roles && (
        <>
          <Select {...selectProps} />
        </>
      )}
    </div>
  )
}

export default UserRoleSelectCell
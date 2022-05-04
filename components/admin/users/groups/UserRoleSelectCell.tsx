import Select from "react-select";
import useGetRoles from "../../../../hooks/roles/useGetRoles";

const UserRoleSelectCell = ({cell, roleType, onChange}) => {

  const { loading: rolesLoading, error: rolesError, roles } = useGetRoles()

  {
    const currentRoles = cell.row.original.roles;
    const selectProps = {
      options: roles && roles.filter(role => role.roleType === roleType),
      getOptionLabel: role => role.name,
      getOptionValue: role => role.name,
      defaultValue: currentRoles[0],
      menuPortalTarget: document.body,
      isSearchable: false,
      onChange,
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
}

export default UserRoleSelectCell
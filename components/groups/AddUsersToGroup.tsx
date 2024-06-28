import { useState } from "react"
import Select, { components } from 'react-select'
import useAddUsersToGroups from "../../hooks/groups/useAddUsersToGroups"
import useGetRoles from "../../hooks/roles/useGetRoles"
import useGetUsers from '../../hooks/users/useGetUsers'
import { closeModal } from "../../stores/modalStore"
import Button from "../common/Button"
import LoadingSpinner from '../common/LoadingSpinner'

const customStyles = {
  option: (provided, state) => {
    return ({
      ...provided,
      padding: 8,
      height: 'auto',
      lineHeight: 1.5
    })
  },
  menuPortal: (provided, state) => ({
    ...provided,
    zIndex: 13000,
  }),
  input: (provided, state) => ({
    ...provided,
    boxShadow: 'none',
  })
}

const Input = props => (
  <components.Input
    {...props}
    inputClassName="outline-none border-none shadow-none focus:ring-transparent"
  />
)
const AddUsersToGroup = ({ group, roleName='Member', isSingle=false }) => {

  const { addUsersToGroups } = useAddUsersToGroups()

  const { users, loading: loadingUsers, error } = useGetUsers()
  const { roles, loading: loadingRoles } = useGetRoles()
  const [open, setOpen] = useState(false);

  const availableUsers = group && users?.edges?.filter(userEdge => {
    return  !group.users?.edges?.some(groupUserEdge => groupUserEdge.node.id === userEdge.node.id)
}) || []

 
  const selectOptions = availableUsers.map(userEdge => ({
    label: userEdge.node.fullName,
    value: userEdge.node.id,
  }))


  const defaultRole = roles?.find(role => role.name === roleName)

  const [selectedUserIds, setSelectedUserIds] = useState([])

  const handleChange = (items) => {
    setSelectedUserIds(isSingle ? [items.value] : items.map(item => item.value));
  }

  const handleEnrol = (e) => {
    addUsersToGroups({
      groupIds: [group.id],
      userIds: selectedUserIds,
      roleId: defaultRole?.id
    }, () => {
      
    });
    closeModal();
  }

  const menuTopMargin = selectedUserIds.length ? 60 : 0;

  const groupTypeName = group.isOrganisation ? 'organisation' : 'group'
  const groupName = group.name === `Untitled ${groupTypeName}` ? `this ${groupTypeName}` : group.name

  if (loadingUsers || loadingRoles) {
    return <LoadingSpinner size='sm' />
  }

  return (
    <>
      {
        availableUsers?.length ? (
          <div>
            <Select
              placeholder={<span className="text-main-secondary">Choose a user...</span>}
              menuIsOpen={open}
              onMenuOpen={() => setOpen(true)}
              onMenuClose={() => setOpen(false)}
              options={selectOptions}
              styles={{
                ...customStyles,
                menu: (provided, state) => ({
                  ...provided,
                  marginTop: menuTopMargin,
                }),
              }}
              onChange={handleChange}
              className={`w-full mb-4`}
              isMulti={!isSingle}
              isSearchable={true}
              closeMenuOnSelect={false}
              menuPortalTarget={document.body}
              menuPlacement={'auto'}
            />

            {/* <GroupMultiLevelSelect data={availableGroupData} onChange={handleChange} /> */}
            {!!selectedUserIds.length && !!defaultRole?.id && (
              <Button onClick={handleEnrol}>
                Add {!isSingle && selectedUserIds.length} user{!isSingle && selectedUserIds.length > 1 && 's'} to {groupName}
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            No users available to assign.
            <Button onClick={closeModal}>OK</Button>
          </div>
        )
      }
    </>
  )
}

export default AddUsersToGroup
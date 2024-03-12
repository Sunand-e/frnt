import Select, { components, MenuProps } from 'react-select'
import { useState } from "react"
import useAddUsersToGroups from "../../../hooks/groups/useAddUsersToGroups"
import useGetGroups from "../../../hooks/groups/useGetGroups"
import useGetRoles from "../../../hooks/roles/useGetRoles"
import useGetUser from "../../../hooks/users/useGetUser"
import { closeModal } from "../../../stores/modalStore"
import { useRouter } from "../../../utils/router"
import Button from "../../common/Button"
import LoadingSpinner from '../../common/LoadingSpinner'
import useGetUsers from '../../../hooks/users/useGetUsers'
import useGetGroup from '../../../hooks/groups/useGetGroup'

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
const AddUsersToGroup = ({ id }) => {

  const { addUsersToGroups } = useAddUsersToGroups()

  const { users, loading: loadingUsers, error } = useGetUsers()
  const { group, loading: loadingGroup } = useGetGroup(id)
  const { roles, loading: loadingRoles } = useGetRoles()
  const [open, setOpen] = useState(false);

  const availableUsers = group && users?.edges?.filter(userEdge =>
    !group.groups?.edges?.some(userGroupEdge => userGroupEdge.node.id === userEdge.node.id)
  ) || []

  const selectOptions = availableUsers.map(userEdge => ({
    label: userEdge.node.name,
    value: userEdge.node.id,
  }))


  const defaultRole = roles?.find(role => role.name === 'Member')

  const [selectedUserIds, setSelectedUserIds] = useState([])

  const handleChange = (items) => {
    setSelectedUserIds(items.map(item => item.value))
  }

  const handleEnrol = (e) => {
    addUsersToGroups({
      groupIds: [group.id],
      userIds: selectedUserIds,
      roleId: defaultRole?.id
    }, () => {
      closeModal()
    })
  }

  const menuTopMargin = selectedUserIds.length ? 60 : 0

  if (loadingUsers || loadingGroup || loadingRoles) {
    return <LoadingSpinner size='sm' />
  }

  return (
    <>
      {
        availableUsers?.length ? (
          <div>
            <Select
              placeholder={<span className="text-main-secondary">Choose group(s)...</span>}
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
              isMulti={true}
              isSearchable={true}
              closeMenuOnSelect={false}
              menuPortalTarget={document.body}
              menuPlacement={'auto'}
            />



            {/* <GroupMultiLevelSelect data={availableGroupData} onChange={handleChange} /> */}
            {!!selectedUserIds.length && !!defaultRole?.id && (
              <Button onClick={handleEnrol}>
                Assign {selectedUserIds.length} user{!!(selectedUserIds.length > 1) && 's'} to {group.name}
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
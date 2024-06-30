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
import { groupTypes } from '../../common/groupTypes'

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
const AddUserToGroups = ({ id, isSingular=false, groupTypeName='group' }) => {

  const { addUsersToGroups } = useAddUsersToGroups()

  const { user, loading: loadingUser, error } = useGetUser(id)
  const { groups, loading: loadingGroups } = useGetGroups()
  const { roles, loading: loadingRoles } = useGetRoles()
  const [open, setOpen] = useState(false);

  const groupType = groupTypes[groupTypeName]

  const availableGroups = user && groups?.edges?.filter(groupEdge =>
    !user.groups?.edges?.some(userGroupEdge => userGroupEdge.node.id === groupEdge.node.id)
  ) || []

  const selectOptions = availableGroups.map(groupEdge => ({
    label: groupEdge.node.name,
    value: groupEdge.node.id,
  }))


  const defaultRole = roles?.find(role => role.name === 'Member')

  const [selectedGroupIds, setSelectedGroupIds] = useState([])

  const selectedGroupNames = (groups?.edges || [])
    .filter(edge => selectedGroupIds.includes(edge.node.id)) // Filter groups by selected IDs
    .map(edge => edge.node.name); // Map to group names

  const handleChange = (items) => {
    setSelectedGroupIds(isSingular ? [items.value] : items.map(item => item.value))
  }

  const handleEnrol = (e) => {
    addUsersToGroups({
      userIds: [user.id],
      groupIds: selectedGroupIds,
      roleId: defaultRole?.id
    }, () => {
      closeModal()
    })
  }

  const menuTopMargin = selectedGroupIds.length ? 60 : 0

  if (loadingUser || loadingGroups || loadingRoles) {
    return <LoadingSpinner size='sm' />
  }

  return (
    <>
      {
        availableGroups?.length ? (
          <div>
            <Select
              placeholder={<span className="text-main-secondary">Choose {groupType.name}{!isSingular && '{s}'}...</span>}
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
              isMulti={!isSingular}
              isSearchable={true}
              closeMenuOnSelect={false}
              menuPortalTarget={document.body}
              menuPlacement={'auto'}
            />



            {/* <GroupMultiLevelSelect data={availableGroupData} onChange={handleChange} /> */}
            {!!selectedGroupIds.length && !!defaultRole?.id && (
              <Button onClick={handleEnrol}>
                Assign {user.fullName} to {selectedGroupIds.length > 1 ? 
                  (`${selectedGroupIds.length} ${groupType.plural}`) : 
                  (`${selectedGroupNames[0]}`)
                }
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            No {groupType.plural} available for {user.fullName}.
            <Button onClick={closeModal}>OK</Button>
          </div>
        )
      }
    </>
  )
}

export default AddUserToGroups
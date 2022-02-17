import { useState } from "react";
import useGetUsers from "../../../../hooks/users/useGetUsers";
import DualListBoxInput from "../../../common/inputs/DualListBoxInput"

const GroupUsersInput = ({control}) => {

  const { users } = useGetUsers();
  const [selectedUsers, setSelectedUsers] = useState([])

  const usersOptions = users?.map(user => {
    return { value: user.id, label: user.fullName }
  })

  return (
    <>
      { users && (
        <DualListBoxInput
          label="Group users"
          control={control}
          name="selectedUsers"
          options={usersOptions}
          selected={selectedUsers}
          onChange={setSelectedUsers}
          lang={{
            availableHeader: 'Available users',
            selectedHeader: 'Selected users',
          }}
        />
      )}
    </>
  )
}

export default GroupUsersInput
import useGetUsers from "../../../hooks/users/useGetUsers";
import DualListBoxInput from "../../common/inputs/DualListBoxInput"

const GroupUsersInput = ({control, label='Group users'}) => {

  const { users } = useGetUsers();

  const usersOptions = users?.edges?.map(({node: user}) => {
    return { value: user.id, label: user.fullName }
  })

  return (
    <>
      { usersOptions && (
        <DualListBoxInput
          label={label}
          control={control}
          name="userIds"
          options={usersOptions}
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
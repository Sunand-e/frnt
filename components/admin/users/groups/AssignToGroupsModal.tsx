import { useContext, useMemo } from "react";
import useAddUsersToGroups from "../../../../hooks/groups/useAddUsersToGroups";
import useGetGroups from "../../../../hooks/groups/useGetGroups";

const AssignToGroupsModal = ({userId}) => {

  const { groups } = useGetGroups()

  const { addUsersToGroups } = useAddUsersToGroups()

  const addUserToGroup = groupId => {
    addUsersToGroups({userIds:[userId], groupIds:[groupId]})
  }

  const groupItems = groups?.map(group => (
    <li onClick={() => addUserToGroup(group.id)}>{group.name}</li>
  ))
  return (
    <ul>
      { groupItems }
    </ul>
  );
}

export default AssignToGroupsModal
import { useContext, useMemo } from "react";
import useAddUsersToGroups from "../../../hooks/groups/useAddUsersToGroups";
import useGetGroups from "../../../hooks/groups/useGetGroups";
import ItemWithImage from "../../common/cells/ItemWithImage";

const AssignToGroupsModal = ({userId}) => {

  const { groups } = useGetGroups()

  const groupNodes = useMemo(() => {
    return groups?.edges?.map(edge => edge.node).filter(node => {
      return !node._deleted
    })
  } ,[groups])

  const { addUsersToGroups } = useAddUsersToGroups()

  const addUserToGroup = groupId => {
    addUsersToGroups({userIds:[userId], groupIds:[groupId]})
  }

  const groupItems = groupNodes?.map(group => (
    <li
      onClick={() => addUserToGroup(group.id)}
      className="flex space-x-2"
    >
      <ItemWithImage
        title={group.name}
      />
    </li>
  ))
  return (
    <ul>
      { groupItems }
    </ul>
  );
}

export default AssignToGroupsModal
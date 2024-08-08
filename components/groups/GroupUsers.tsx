import { GraduationCap } from "@styled-icons/fa-solid/GraduationCap";
import { useCallback, useMemo } from "react";
import useGetCourses from "../../hooks/courses/useGetCourses";
import useGetGroup from "../../hooks/groups/useGetGroup";
import { handleModal } from "../../stores/modalStore";
import { useRouter } from "../../utils/router";
import BoxContainerTable from "../common/tables/BoxContainerTable";
import AddUsersToGroup from "./AddUsersToGroup";
import GroupUserActionsMenu from "./GroupUserActionsMenu";
import ItemWithImage from "../common/cells/ItemWithImage";
import { User } from '@styled-icons/fa-solid/User';
import useRemoveUsersFromGroups from "../../hooks/groups/useRemoveUsersFromGroups";
import GroupAvailableUsersTable from "./GroupAvailableUsersTable";

const GroupUsers = ({
  title = "Members",
  addMembersButtonText = "Add members",
  addMembersModalText = "Add members",
  newMemberRole = "Member",
  showRoles = [],
  isSingle = false
}) => {

  const router = useRouter();
  const { id } = router.query;

  const { courses } = useGetCourses();
  const { group } = useGetGroup(id);

  const userEdges = useMemo(
    () => group?.users.edges.filter(edge => {
      if (!!edge.node._deleted) return false;
      if (showRoles.length > 0 && !edge.roles.some(role => showRoles.includes(role.name))) return false;
      return true;
    }) || [],
    [group, showRoles]
  );

  const { removeUsersFromGroups } = useRemoveUsersFromGroups()
  
  const handleRemove = useCallback(ids => {
    const idsArray = Array.isArray(ids) ? ids : [ids]
    removeUsersFromGroups({
      groupIds: [group.id],
      userIds: idsArray,
    })
  }, [group])


  const button = {
    text: addMembersButtonText,
    disabled: isSingle && userEdges.length > 0,
    onClick: () => {
      handleModal({
        title: addMembersModalText,
        content: (
          <GroupAvailableUsersTable group={group} roleName={newMemberRole} />
        ),
        size: 'lg'
      });
    }
  };

  const tableCols = useMemo(() => {
    return [
      {
        header: "User",
        accessorFn: row => row.node.fullName,
        cell: ({ cell }) => {
          const user = cell.row.original.node;
          return (
            <ItemWithImage
              title={user.fullName}
              secondary={user.email}
              imageSrc={user.profileImageUrl}
              icon={<User className="p-2" />}
              placeholder={"/images/user-generic.png"}
            />
          );
        }
      },
      {
        header: "Actions",
        cell: ({ cell }) => <GroupUserActionsMenu group={group} edge={cell.row.original} onRemove={handleRemove} />,
      },
    ];
  }, [group]);

  const bulkActions = [
    {
      label: `Remove selected users`,
      labelFn: (ids: Array<string>) => `Remove ${ids.length > 1 ? ids.length : ''} selected ${ids.length === 1 ? "user" : "users"}`,
      onClick: (ids: Array<string>) => handleRemove(ids),
    }
  ]

  const tableProps = {
    tableData: isSingle && userEdges.length > 0 ? [userEdges[0]] : userEdges,
    tableCols,
    bulkActions,
  };

  return (
    <BoxContainerTable
      title={title}
      icon={GraduationCap}
      button={button}
      tableProps={tableProps}
    />
  );
}

export default GroupUsers;
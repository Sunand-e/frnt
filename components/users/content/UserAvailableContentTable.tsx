import { useState } from 'react';
import useEnrolUsersInContent from "../../../hooks/contentItems/useEnrolUsersInContent"
import { closeModal } from "../../../stores/modalStore";
import ContentSelectTable from "../../common/tables/ContentSelectTable";
import useGetUserContent from '../../../hooks/users/useGetUserContent';
import useGetRoles from '../../../hooks/roles/useGetRoles';
import useUserHasCapability from '../../../hooks/users/useUserHasCapability';
import useGetCurrentUser from '../../../hooks/users/useGetCurrentUser';
import useGetGroupsDetailed from '../../../hooks/groups/useGetGroupsDetailed';
import useGetContent from '../../../hooks/contentItems/useGetContent';

const UserAvailableContentTable = ({ user, typeName = 'content' }) => {

  const {enrolUsersInContent} = useEnrolUsersInContent()
  const [selectedContentIds, setSelectedContentIds] = useState([]);
  const { content: userContent, loading: userContentLoading } = useGetUserContent(user.id, typeName)
  const { content, loading: contentLoading } = useGetContent(typeName)

  const { userHasCapability } = useUserHasCapability()
  const shouldFetchGroupsContents = !userHasCapability('EnrolUsersInContent', 'tenant')
  const { groups, loading: groupsLoading } = useGetGroupsDetailed(shouldFetchGroupsContents)
  const actionName = 'Assign';

  const userContentNodes = userContent?.edges.filter(edge => (
    !edge.node._deleted
     && (
      edge.groups.edges.some(edge => edge.roles.length) || 
      edge.roles.length
    )
  )).map(edge => edge.node)
  
  const contentFilter = (content) => !userContentNodes?.some(userContent=>userContent.id === content.id)

  const {roles} = useGetRoles()

  const defaultRole = roles?.find(role => role.name === 'Learner')

  const { user: currentUser } = useGetCurrentUser()
  
  const onSubmit = (selectedContentIds) => {
    enrolUsersInContent({
      userIds: [user.id],
      contentItemIds: selectedContentIds,
      roleId: defaultRole?.id
    });
    closeModal();
  };
  let availableContentNodes = []

  if (userHasCapability('EnrolUsersInContent', 'tenant')) {
    availableContentNodes = content?.edges.map(edge => edge.node) || []
  } else {  
    const userGroupIds = user.groups.edges.map(edge => edge.groupId)
    const currentUserGroupIds = currentUser.groups.edges.map(edge => edge.groupId)
    const commonGroupIds = userGroupIds.filter(groupId => currentUserGroupIds.includes(groupId))

    const commonGroupProvisionedContents = groups?.edges.flatMap(
      edge => commonGroupIds.includes(edge.node.id) ? edge.node.provisionedContents.edges : []
    ) || []

    const commonGroupProvisionedContentNodes = commonGroupProvisionedContents.map(edge => edge.node)
    const currentUserEnrolledContentNodes = content?.edges.map(edge => edge.node) || []
    
    availableContentNodes = [
      ...commonGroupProvisionedContentNodes.filter(node => node.itemType === typeName),
      ...currentUserEnrolledContentNodes
    ]
  }
  const availableContent = availableContentNodes?.filter(contentFilter) || []

  return (
    <ContentSelectTable
      availableContent={availableContent}
      onRowSelect={setSelectedContentIds}
      selectedContentIds={selectedContentIds}
      contentType={typeName}
      filters={['category', 'global', 'collection', 'itemType']}
      recipient={user}
      actionName={actionName}
      onSubmit={onSubmit}
    />
  );
};

export default UserAvailableContentTable;
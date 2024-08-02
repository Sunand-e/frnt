import { use, useState } from 'react';
import { contentTypes } from "../../common/contentTypes";
import useEnrolUsersInContent from "../../../hooks/contentItems/useEnrolUsersInContent"
import { closeModal } from "../../../stores/modalStore";
import ContentSelectTable from "../../common/tables/ContentSelectTable";
import useGetUserContent from '../../../hooks/users/useGetUserContent';
import useGetRoles from '../../../hooks/roles/useGetRoles';

const UserAvailableContentTable = ({ user, typeName = 'content' }) => {

  const {enrolUsersInContent} = useEnrolUsersInContent()
  const [selectedContentIds, setSelectedContentIds] = useState([]);
  const { content: userContent, loading: userContentLoading } = useGetUserContent(user.id, typeName)

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

  const onSubmit = (selectedContentIds) => {
    enrolUsersInContent({
      userIds: [user.id],
      contentItemIds: selectedContentIds,
      roleId: defaultRole?.id
    });
    closeModal();
  };

  return (
    <ContentSelectTable
      onRowSelect={setSelectedContentIds}
      selectedContentIds={selectedContentIds}
      contentType={typeName}
      contentFilter={contentFilter}
      filters={['category', 'global', 'collection', 'itemType']}
      recipient={user}
      actionName={actionName}
      onSubmit={onSubmit}
    />
  );
};

export default UserAvailableContentTable;
import { useState } from 'react';
import useAssignContentToGroups from "../../hooks/groups/useAssignContentToGroups";
import useProvideContentToGroups from "../../hooks/groups/useProvideContentToGroups";
import { closeModal } from "../../stores/modalStore";
import ContentSelectTable from "../common/tables/ContentSelectTable";
import useUserHasCapability from '../../hooks/users/useUserHasCapability';
import useGetContent from '../../hooks/contentItems/useGetContent';

const GroupAvailableContentTable = ({ group, groupType = 'group', associationType = 'assigned', contentType = 'content' }) => {

  const { provideContentToGroups } = useProvideContentToGroups();
  const { assignContentToGroups } = useAssignContentToGroups();
  const { userHasCapability } = useUserHasCapability();

  const { content, loading: contentLoading } = useGetContent(contentType)
  
  const [selectedContentIds, setSelectedContentIds] = useState([]);

  let actionName;
  let associateContentWithGroup;

  if (associationType === 'assigned') {
    associateContentWithGroup = assignContentToGroups;
    actionName = 'Assign';
  } else if (associationType === 'provided') {
    associateContentWithGroup = provideContentToGroups;
    actionName = 'Provide';
  }

  const onSubmit = (selectedContentIds) => {
    associateContentWithGroup({
      groupIds: [group.id],
      contentItemIds: selectedContentIds,
    });
    closeModal();
  };

  let availableContentNodes

  if (userHasCapability('EnrolUsersInContent', 'tenant')) {
    availableContentNodes = content?.edges.map(edge => edge.node) || []
  }

  const contentFilter = (content) => {
    let existingAssociatedContent;
    if (associationType === 'assigned') {
      existingAssociatedContent = group.assignedContents.edges.map(edge => edge.node);
    } else if (associationType === 'provided') {
      existingAssociatedContent = group.provisionedContents.edges.map(edge => edge.node);
    }
    return !existingAssociatedContent.some(existingContent => existingContent.id === content.id);
  };

  const availableContent = availableContentNodes?.filter(contentFilter) || []

  return (
    <ContentSelectTable
      onRowSelect={setSelectedContentIds}
      selectedContentIds={selectedContentIds}
      availableContent={availableContent}
      contentType={contentType}
      filters={['category', 'global', 'collection', 'itemType']}
      recipient={group}
      actionName={actionName}
      onSubmit={onSubmit}
    />
  );
};

export default GroupAvailableContentTable;
import { useState } from 'react';
import { contentTypes } from "../common/contentTypes";
import useAssignContentToGroups from "../../hooks/groups/useAssignContentToGroups";
import useProvideContentToGroups from "../../hooks/groups/useProvideContentToGroups";
import { closeModal } from "../../stores/modalStore";
import ContentSelectTable from "../common/tables/ContentSelectTable";

const GroupAvailableContentTable = ({ group, groupType = 'group', associationType = 'assigned', contentType = 'content' }) => {
  const type = contentTypes[contentType];
  const { provideContentToGroups } = useProvideContentToGroups();
  const { assignContentToGroups } = useAssignContentToGroups();
  
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

  const contentFilter = (content) => {
    let existingAssociatedContent;
    if (associationType === 'assigned') {
      existingAssociatedContent = group.assignedContents.edges.map(edge => edge.node);
    } else if (associationType === 'provided') {
      existingAssociatedContent = group.provisionedContents.edges.map(edge => edge.node);
    }
    return !existingAssociatedContent.some(existingContent => existingContent.id === content.id);
  };

  const onSubmit = (selectedContentIds) => {
    associateContentWithGroup({
      groupIds: [group.id],
      contentItemIds: selectedContentIds,
    });
    closeModal();
  };

  return (
    <ContentSelectTable
      onRowSelect={setSelectedContentIds}
      selectedContentIds={selectedContentIds}
      contentType={contentType}
      contentFilter={contentFilter}
      recipientType={groupType}
      recipient={group}
      actionName={actionName}
      onSubmit={onSubmit}
    />
  );
};

export default GroupAvailableContentTable;
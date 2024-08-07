import { useState } from 'react';
import useGetContent from '../../hooks/contentItems/useGetContent';
import useGetPathway from '../../hooks/pathways/useGetPathway';
import useUserHasCapability from '../../hooks/users/useUserHasCapability';
import { closeModal } from "../../stores/modalStore";
import { useRouter } from '../../utils/router';
import ContentSelectTable from "../common/tables/ContentSelectTable";
import { usePathwayStore } from './usePathwayStore';

const PathwayAvailableContentTable = () => {

  const router = useRouter()
    
  const { pid } = router.query
  const { pathway } = useGetPathway(pid)

  const { userHasCapability } = useUserHasCapability();

  const items = usePathwayStore(state => state.items)
  const addItem = usePathwayStore(state => state.addItem)

  const { content, loading: contentLoading } = useGetContent('content')
  
  const [selectedContentIds, setSelectedContentIds] = useState([]);

  let actionName = 'Add';

  let availableContentNodes

  if (userHasCapability('UpdatePathway', 'tenant')) {
    availableContentNodes = content?.edges.map(edge => edge.node) || []
  }

  const availableContent = availableContentNodes?.filter(node => node.itemType !== 'pathway') || []

  const onSubmit = (selectedContentIds) => {
    selectedContentIds.forEach(id => {
      const content = availableContent.find(item => item.id === id)
      addItem(content)
    })
    closeModal();
  };

  return (
    <>
    <ContentSelectTable
      onRowSelect={setSelectedContentIds}
      selectedContentIds={selectedContentIds}
      availableContent={availableContent}
      contentType={'content'}
      filters={['category', 'global', 'collection', 'itemType']}
      recipient={pathway}
      actionName={actionName}
      onSubmit={onSubmit}
      dontShowTypes={['pathway']}
    />
    </>
  );
};

export default PathwayAvailableContentTable;
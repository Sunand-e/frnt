import { useState } from "react"
import useAddTagsToContent from "../../hooks/contentItems/useAddTagsToContent"
import useGetContent from "../../hooks/contentItems/useGetContent"
import useGetSharedContentItems from "../../hooks/tenants/useGetSharedContentItems"
import useShareContentItems from "../../hooks/tenants/useShareContentItems"
import { closeModal } from "../../stores/modalStore"
import Button from "../common/Button"
import ContentSelectTable from "../common/tables/ContentSelectTable"

const TenantAvailableContent = ({ tenant }) => {

  const { content, loading: contentLoading } = useGetContent('content')

  const { shareContentItems } = useShareContentItems()
  
  const { sharedContentItems } = useGetSharedContentItems(tenant.id)
  console.log('sharedContentItems')
  console.log(sharedContentItems)
  const contentNodes = content?.edges.map((edge: any) => edge.node);

  const availableContent = contentNodes?.filter((node: any) =>
    !sharedContentItems.courses?.edges.find((edge) => edge.node.id === node.id) &&
    !sharedContentItems.resources?.edges.find((edge) => edge.node.id === node.id) &&
    !sharedContentItems.pathways?.edges.find((edge) => edge.node.id === node.id)
  ) || [];

  const [selectedContentIds, setSelectedContentIds] = useState([]);

  const onSubmit = (selectedIds: any) => {
    shareContentItems({
      tenantId: tenant.id,
      contentItemIds: selectedIds,
    });
    closeModal();
  };

  return (
    <>
      {
        contentLoading || availableContent.length ? (
          <ContentSelectTable
            availableContent={availableContent}
            selectedContentIds={selectedContentIds}
            onRowSelect={setSelectedContentIds}
            recipient={tenant}
            isLoading={contentLoading}
            filters={['category', 'global']}
            actionName="Share"
            onSubmit={onSubmit}
          />
        ) : (
          <div className="flex flex-col items-center">
            No content available to share
            <Button onClick={closeModal}>OK</Button>
          </div>
        )
      }
    </>
  );
};

export default TenantAvailableContent
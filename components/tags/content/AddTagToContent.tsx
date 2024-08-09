import { is } from "cypress/types/bluebird"
import { useState } from "react"
import useAddTagsToContent from "../../../hooks/contentItems/useAddTagsToContent"
import { closeModal } from "../../../stores/modalStore"
import Button from "../../common/Button"
import ContentSelectTable from "../../common/tables/ContentSelectTable"

const AddTagToContent = ({ tag, content, isLoading, typeName = 'item' }) => {
  const { addTagsToContent } = useAddTagsToContent();

  const contentNodes = content?.edges.map(edge => edge.node);

  const availableContent = contentNodes?.filter(node =>
    !node.tags.edges.find(({ node }) => node.id === tag.id)
  ) || [];

  const [selectedContentIds, setSelectedContentIds] = useState([]);

  const handleAddTagToContent = () => {
    addTagsToContent({
      tagIds: [tag.id],
      contentItemIds: selectedContentIds,
    }, () => {
      closeModal();
    });
  };

  const onSubmit = (selectedIds) => {
    setSelectedContentIds(selectedIds);
    handleAddTagToContent();
  };

  return (
    <>
      {
        isLoading || availableContent.length ? (
          <ContentSelectTable
            availableContent={availableContent}
            selectedContentIds={selectedContentIds}
            onRowSelect={setSelectedContentIds}
            contentType={typeName}
            recipient={tag}
            isLoading={isLoading}
            filters={['category', 'global']}
            actionName="Add"
            onSubmit={onSubmit}
          />
        ) : (
          <div className="flex flex-col items-center">
            No {typeName}s available
            <Button onClick={closeModal}>OK</Button>
          </div>
        )
      }
    </>
  );
};

export default AddTagToContent
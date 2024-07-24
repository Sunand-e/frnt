import { useState } from "react"
import useAddTagsToContent from "../../../hooks/contentItems/useAddTagsToContent"
import { closeModal } from "../../../stores/modalStore"
import Button from "../../common/Button"
import ContentSelectTable from "../../common/tables/ContentSelectTable"

const AddTagToContent = ({ tag, content, typeName = 'item' }) => {
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

  const contentFilter = (contentItem) => {
    return !contentItem.tags.edges.find(({ node }) => node.id === tag.id);
  };

  const onSubmit = (selectedIds) => {
    setSelectedContentIds(selectedIds);
    handleAddTagToContent();
  };

  return (
    <>
      {
        availableContent.length ? (
          <div>
            <ContentSelectTable
              selectedContentIds={selectedContentIds}
              onRowSelect={setSelectedContentIds}
              contentType={typeName}
              contentFilter={contentFilter}
              recipientType="tag"
              recipient={tag}
              actionName="Add"
              onSubmit={onSubmit}
            />
          </div>
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
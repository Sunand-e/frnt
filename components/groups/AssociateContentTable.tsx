import { useEffect, useMemo, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import Table from "../common/tables/Table";
import Button from "../common/Button";
import { contentTypes } from "../common/contentTypes";
import useAssignContentToGroups from "../../hooks/groups/useAssignContentToGroups";
import useProvideContentToGroups from "../../hooks/groups/useProvideContentToGroups";
import { closeModal } from "../../stores/modalStore";
import useGetRoles from "../../hooks/roles/useGetRoles";
import ItemWithImage from "../common/cells/ItemWithImage";
import { resourceTypes } from "../resources/resourceTypes";
import { getIconFromFilename } from "../../utils/getIconFromFilename";
import useGetThumbnail from "../common/items/useGetThumbnail";

const GroupAvailableContentTable = ({ group, groupType = 'group', associationType = 'assigned', contentType = 'content' }) => {

  const type = contentTypes[contentType];
  
  const [getContent, { loading: contentLoading, data: content }] = useLazyQuery(type.gqlGetQuery, { 
    ...(type.gqlVariables && { variables: type.gqlVariables }),
    fetchPolicy: "network-only" });

  useEffect(() => {
    getContent();
  }, [getContent]);

  const {provideContentToGroups} = useProvideContentToGroups()
  const {assignContentToGroups} = useAssignContentToGroups()

  const contentNodes = content?.[type.pluralKey]?.edges.map(edge => edge.node)
  
  let existingAssociatedContentConnection
  let associateContentWithGroup
  let actionName

  if(associationType === 'assigned') {
    existingAssociatedContentConnection = group.assignedContents
    associateContentWithGroup = assignContentToGroups
    actionName = 'assign'
  } else if(associationType === 'provided') {
    existingAssociatedContentConnection = group.provisionedContents
    associateContentWithGroup = provideContentToGroups
    actionName = 'provide'
  }

  const actionNameCapitalised = actionName.charAt(0).toUpperCase() + actionName.slice(1)
  
  const existingAssociatedContentNodes = existingAssociatedContentConnection?.edges.filter(edge => (
    !edge.node._deleted
  )).map(edge => edge.node)
  
  // console.log('existingAssociatedContentNodes')
  // console.log(existingAssociatedContentNodes)
  // console.log('contentNodes')
  // console.log(contentNodes)
  const availableContent = contentNodes?.filter(content => 
    !existingAssociatedContentNodes?.some(existingContentNode=>existingContentNode.id === content.id)
  ) || []
  
  const {roles} = useGetRoles()

  const defaultRole = roles?.find(role => role.name === 'Member')

  const [selectedContentIds, setSelectedContentIds] = useState([])

  const handleRowSelect = (items) => {
    console.log('items')
    console.log(items)
    setSelectedContentIds(items)
  }

  const handleSubmit = (e) => {
    associateContentWithGroup({
      groupIds: [group.id],
      contentItemIds: selectedContentIds,
    }
    // , () => {
    //   closeModal()
    )
    closeModal()
  }

  const tableData = useMemo(() => availableContent, [availableContent]);

  const tableCols = useMemo(() => [
    {
      header: "Content",
      accessorFn: row => row.title,

      cell: ({ cell }) => {
        const type = contentTypes[cell.row.original.itemType]
        
        const { src } = useGetThumbnail(cell.row.original, 50)
        const { contentType, itemType } = cell.row.original
        let icon = <type.icon className='p-1.5'/>
        let rounded = 'full'
         
        if(itemType==='resource') {
          const IconComponent = (contentType === 'document') ? (
            getIconFromFilename(cell.row.original.document?.fileName)
          ) : (
            resourceTypes[contentType]?.icon
          )
          icon = <IconComponent className='p-1.5' />
          rounded = (!src && contentType === 'document') ? 'none' : 'full'
        }
        const cellProps = {
          image: cell.row.original.image,
          imageSrc: src,
          icon,
          rounded,
          title: cell.getValue(),
        }


        return (
        <ItemWithImage { ...cellProps } />
        )
      }
    },
    {
      header: "Type",
      accessorFn: row => row.itemType,
      cell: ({ cell }) => {
        const type = contentTypes[cell.row.original.itemType]
        return type.label
      }
    },
  ], []);

  return (
    <>
      <Table
        tableData={tableData}
        tableCols={tableCols}
        filters={['category', 'global', 'itemType']}
        scrollInTable={true}
        maxVisibleRows={9}
        selectedRowIds={selectedContentIds}
        isSelectable={true}
        onRowSelect={handleRowSelect}
        rowSizing='sm'
      />
      {!!selectedContentIds.length && (
        <Button className="mt-4 -mb-4" onClick={handleSubmit}>
          {actionNameCapitalised} {selectedContentIds.length} content
          item{ selectedContentIds.length > 1 ? 's' : '' } to {group.name}
        </Button>
      )}
    </>
  );
}

GroupAvailableContentTable.whyDidYouRender = true

export default GroupAvailableContentTable;
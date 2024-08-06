import { GraduationCap } from "@styled-icons/fa-solid/GraduationCap";
import { useCallback, useMemo } from "react";
import useGetGroup from "../../hooks/groups/useGetGroup";
import useRemoveAssignedContentFromGroups from "../../hooks/groups/useRemoveAssignedContentFromGroups";
import useRemoveProvisionedContentFromGroups from "../../hooks/groups/useRemoveProvisionedContentFromGroups";
import { handleModal } from "../../stores/modalStore";
import { commonTableCols } from "../../utils/commonTableCols";
import { getContentTypeStringWithCount } from "../../utils/getContentTypeStringWithCount";
import { useRouter } from "../../utils/router";
import ContentTitleCell from "../common/cells/ContentTitleCell";
import ItemWithImage from "../common/cells/ItemWithImage";
import { contentTypes } from "../common/contentTypes";
import BoxContainerTable from "../common/tables/BoxContainerTable";
import GroupAvailableContentTable from "./GroupAvailableContentTable";
import GroupContentActionsMenu from "./GroupContentActionsMenu";

type AssociationType = 'assigned' | 'provided'

const GroupContent = ({typeName='content', groupType='group', associationType='assigned'}) => {

  const type = contentTypes[typeName]
  
  const router = useRouter()
  const { id } = router.query
  const { loading, error, group } = useGetGroup(id)

  let actionNameCapitalised
  if(associationType === 'assigned') {
    actionNameCapitalised = 'Assign'
  } else if(associationType === 'provided') {
    actionNameCapitalised = 'Provide'
  }

  const { removeProvisionedContentFromGroups } = useRemoveProvisionedContentFromGroups()
  const { removeAssignedContentFromGroups } = useRemoveAssignedContentFromGroups()
  
  const handleRemove = useCallback((ids) => {
    const idsArray = Array.isArray(ids) ? ids : [ids];
    if(associationType === 'assigned') {
      removeAssignedContentFromGroups({
        groupIds: [group.id],
        contentItemIds: idsArray,
      })
    } else if(associationType === 'provided') {
      removeProvisionedContentFromGroups({
        groupIds: [group.id],
        contentItemIds: idsArray,
      })
    }
  }, [group])

  const button = {
    text: `${actionNameCapitalised} ${type?.plural}`,
    onClick: () => {
      handleModal({
        title: `${actionNameCapitalised} ${type?.plural}`,
        content: (
          <GroupAvailableContentTable
            group={group}
            associationType={associationType}
            contentType={typeName}
          />
        ),
        size: 'lg'
      })
    }
  }

  const boxTitle = type?.plural.charAt(0).toUpperCase() + type?.plural.slice(1);

  const groupTypeName = group.isOrganisation ? 'organisation' : 'group'

  const bulkActions = [
    {
      label: `Remove selected items from ${groupTypeName}`,
      labelFn: (ids: Array<string>) => `Remove ${getContentTypeStringWithCount(type, ids.length, 'selected')}`,
      onClick: (ids: Array<string>) => handleRemove(ids),
    }
  ]

  const tableData = useMemo(
    () => {
      let existingAssociatedContentConnection
      if(associationType === 'assigned') {
        existingAssociatedContentConnection = group.assignedContents
      } else if(associationType === 'provided') {
        existingAssociatedContentConnection = group.provisionedContents
      }
      // console.log('existingAssociatedContentConnection')
      // console.log(existingAssociatedContentConnection)
      return existingAssociatedContentConnection.edges.filter(edge => (
        (typeName === 'content' || edge.node.itemType === typeName) &&
        !edge.node._deleted
        )).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || []
    },
    [group]
  );

  const tableCols = useMemo(() => {
    return [
      {
        header: type.label,
        accessorFn: row => row.node.title,
        cell: ({ cell }) => <ContentTitleCell item={cell.row.original.node} />
      },
      commonTableCols.createdAt,
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ cell }) => (
          <GroupContentActionsMenu
            onRemove={handleRemove}
            group={group}
            associationType={associationType}
            edge={cell.row.original}
            typeName={typeName}
          />
        )
      },
    ]
  }, [group]);

  const tableProps = {
    tableData,
    tableCols,
    bulkActions,
  }

  return (
    <BoxContainerTable
      title={boxTitle}
      icon={GraduationCap}
      button={button}
      tableProps={tableProps}
    />
  );
}

export default GroupContent
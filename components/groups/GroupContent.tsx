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
import { contentTypes } from "../common/contentTypes";
import BoxContainerTable from "../common/tables/BoxContainerTable";
import GroupAvailableContentTable from "./GroupAvailableContentTable";
import GroupContentActionsMenu from "./GroupContentActionsMenu";

type AssociationType = {
  name: string,
  presentTense: string,
  dataKey: string,
  removeAssociationsFn: Function
}

const capitaliseWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const GroupContent = ({typeName='content', groupType='group', associationTypeName='assigned'}) => {

  const type = contentTypes[typeName]
  
  
  const router = useRouter()
  const { id } = router.query
  const { loading, error, group } = useGetGroup(id)

  const { removeAssignedContentFromGroups } = useRemoveAssignedContentFromGroups()
  const { removeProvisionedContentFromGroups } = useRemoveProvisionedContentFromGroups()
  
  const associationTypes: Record<string, AssociationType> = {
    assigned: {
      name: 'assigned',
      presentTense: 'assign',
      dataKey: 'assignedContents',
      removeAssociationsFn: removeAssignedContentFromGroups
    },
    provided: {
      name: 'provided',
      presentTense: 'provide',
      dataKey: 'provisionedContents',
      removeAssociationsFn: removeProvisionedContentFromGroups
    }
  }

  const associationType: AssociationType = associationTypes[associationTypeName]

  let actionNameCapitalised = capitaliseWord(associationType.presentTense)
  let associationTypeCapitalised = capitaliseWord(associationType.name)


  const handleRemove = useCallback((ids) => {
    const idsArray = Array.isArray(ids) ? ids : [ids];
    associationType.removeAssociationsFn({
      groupIds: [group.id],
      contentItemIds: idsArray,
    })
  }, [group])

  const button = {
    text: `${actionNameCapitalised} ${type?.plural}`,
    onClick: () => {
      handleModal({
        title: `${actionNameCapitalised} ${type?.plural}`,
        content: (
          <GroupAvailableContentTable
            group={group}
            associationType={associationType.name}
            contentType={typeName}
          />
        ),
        size: 'lg'
      })
    }
  }

  const boxTitle = `${associationTypeCapitalised} ${type?.plural.charAt(0).toUpperCase()}${type?.plural.slice(1)}`;

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
      return group[associationType.dataKey].edges.filter(edge => (
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
        ...commonTableCols.actions,
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
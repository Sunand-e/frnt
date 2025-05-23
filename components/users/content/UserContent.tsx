import { useMemo, useCallback } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import { handleModal } from "../../../stores/modalStore";
import { useRouter } from "../../../utils/router";
import BoxContainerTable from "../../common/tables/BoxContainerTable";
import UserAvailableContentTable from "../content/UserAvailableContentTable";
import UserContentActionsMenu from "../content/UserContentActionsMenu";
import { contentTypes } from "../../common/contentTypes";
import useUnenrolUserFromContent from "../../../hooks/contentItems/useUnenrolUserFromContent";
import { getContentTypeStringWithCount } from "../../../utils/getContentTypeStringWithCount";
import ContentTitleCell from "../../common/cells/ContentTitleCell";
import { commonTableCols } from "../../../utils/commonTableCols";
import TooltipIfClamped from "../../common/floating-ui/TooltipIfClamped";

interface UserContentProps {
  contentType: 'course' | 'resource' | 'pathway' | 'content';
}

const UserContent = ({ contentType }: UserContentProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading, error } = useGetUser(id as string);
  const { unenrolUserFromContent } = useUnenrolUserFromContent()

  const type = contentTypes[contentType];

  const button = useMemo(() => ({
    text: `Assign ${type.plural}`,
    onClick: () => {
      handleModal({
        title: `Enrol user in ${type.plural}`,
        content: <UserAvailableContentTable user={user} typeName={contentType} />,
        size: 'lg'
      });
    }
  }), [user, contentType, type.plural]);

  const handleRevoke = useCallback((ids: any) => {

    unenrolUserFromContent({
      userIds: [user.id],
      contentItemIds: ids,
    })
  }, [user, unenrolUserFromContent])

  const bulkActions = [
    {
      label: `Unassign selected ${type.plural}`,
      labelFn: (ids: Array<string>) => `Unassign ${getContentTypeStringWithCount(type, ids.length, 'selected')}`,
      onClick: (ids: Array<string>) => handleRevoke(ids),
    }
  ]

  const tableData = useMemo(() => {
    return (
      user?.[type.pluralKey].edges.reduce((acc: any, edge: any) => {
        // Check if the edge node is not deleted and has relevant roles
        const hasRoles =
          edge.groups?.edges.some((groupEdge: any) => groupEdge.roles.length) ||
          edge.roles?.length;

        if (!edge.node._deleted && hasRoles) {
          // Check if the edge has groups with edges and set checkboxDisabled
          const hasGroupsWithEdges = edge.groups?.edges.some((groupEdge: any) => groupEdge.roles.length)
          acc.push({
            ...edge,
            checkboxDisabled: hasGroupsWithEdges,
          });
        }

        return acc;
      }, []) || []
    );
  }, [user, type.pluralKey]);

  const tableCols = useMemo(() => {
    return [
      {
        header: type.label,
        accessorFn: (row: any) => row.node.title,
        cell: ({ cell }) => <ContentTitleCell item={cell.row.original.node} />
      },
      {
        id: "AssignmentStatus",
        header: "Status",
        cell: ({ cell }) => {
          const values = cell.row.original;
          return (
            <TooltipIfClamped className="text-center line-clamp-2">
              {cell.row.original.groups?.edges.length ? (
                <>
                  Assigned via group:
                  <strong> {cell.row.original.groups.edges.map((edge: any) => edge.node.name).join(', ')}
                  </strong>
                </>
              ) : (
                'Assigned'
              )}
            </TooltipIfClamped>
          )
        }
      },
      {
        ...commonTableCols.actions,
        cell: ({ cell }) => <UserContentActionsMenu content={cell.row.original} onRevoke={handleRevoke} />
      },
    ]
  }, [type.label]);

  const tableProps = {
    bulkActions,
    tableData,
    tableCols
  }

  return (
    <BoxContainerTable
      title={type.pluralLabel}
      icon={type.icon}
      button={button}
      tableProps={tableProps}
    />
  );
}

export default UserContent;
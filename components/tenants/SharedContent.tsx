import { GraduationCap } from "@styled-icons/fa-solid/GraduationCap";
import { useMemo } from "react";
import { Tenant } from "../../graphql/generated";
import useGetSharedContentItems from "../../hooks/tenants/useGetSharedContentItems";
import useRevokeShareContentItems from "../../hooks/tenants/useRevokeShareContentItems";
import { handleModal } from "../../stores/modalStore";
import { getContentTypeStringWithCount } from "../../utils/getContentTypeStringWithCount";
import { contentTypes } from "../common/contentTypes";
import TooltipIfClamped from "../common/floating-ui/TooltipIfClamped";
import BoxContainerTable from "../common/tables/BoxContainerTable";
import { TableProps } from "../common/tables/tableContext";
import TenantAvailableContent from "./TenantAvailableContent";

type SharedContentProps = {
  tenant: Tenant
  typeName?: string
}

const SharedContent = ({tenant, typeName='content'}: SharedContentProps) => {
  
  const contentType = contentTypes[typeName]

  const { sharedContentItems, loading } = useGetSharedContentItems(tenant.id)
  const { revokeShareContentItems } = useRevokeShareContentItems()

  const handleRemove = (ids: any) => {
    revokeShareContentItems({
      tenantId: tenant.id,
      contentItemIds: ids,
    })
  }

  const actionNameCapitalised = 'Share'
  const button = {
    text: `${actionNameCapitalised} content to ${tenant.name}`,
    onClick: () => {
      handleModal({
        title: `${actionNameCapitalised} content to ${tenant.name}`,
        content: (
          <TenantAvailableContent
            tenant={tenant}
          />
        ),
        size: 'lg'
      })
    }
  }
  
  const bulkActions = [
    {
      label: `Revoke selected items from ${tenant.name}`,
      labelFn: (ids: Array<string>) => `Revoke ${getContentTypeStringWithCount(contentType, ids.length, 'selected')}`,
      onClick: (ids: Array<string>) => handleRemove(ids),
    }
  ]

  const tableData = useMemo(() => [
    ...sharedContentItems?.courses.edges.map(edge => ({...edge.node, itemType: 'course' })) || [],
    ...sharedContentItems?.resources.edges.map(edge => ({...edge.node, itemType: 'resource' })) || [],
    ...sharedContentItems?.pathways.edges.map(edge => ({...edge.node, itemType: 'pathway' })) || [],
  ], [tenant, sharedContentItems]);

  const tableCols = useMemo(() => {
    return [
      {
        header: contentType.label,
        accessorFn: (row: any) => row.title, // accessor is the key in the data
        cell: ({ cell }) => (
          <TooltipIfClamped className="line-clamp-1">
            {cell.getValue()}
          </TooltipIfClamped>
        )
        // cell: ({ cell }) => <ContentTitleCell item={cell.row.original} />,
      },
      {
        header: 'Type',
        accessorFn: (row: any) => contentTypes[row.itemType].label, // accessor is the key in the data
        // cell: ({ cell }) => <ContentTitleCell item={cell.row.original} />,
      },
    ]
  }, []);

  const tableProps: TableProps = {
    tableData,
    tableCols,
    bulkActions,
    isLoading: loading,
    rowSizing: 'sm',
    maxVisibleRows: 10,
    loadingText: `Loading tenant ${contentType.plural}`,
    count: sharedContentItems?.courses.edges.length + sharedContentItems?.resources.edges.length + sharedContentItems?.pathways.edges.length,
  }

  return (
    <BoxContainerTable
      title={`Shared ${contentType.label}s`}
      icon={GraduationCap}
      button={button}
      tableProps={tableProps}
    />
  )
}

export default SharedContent
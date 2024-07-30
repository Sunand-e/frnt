import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { Group, Tag } from "../../../graphql/generated";
import { getIconFromFilename } from "../../../utils/getIconFromFilename";
import { getContentTypeStringWithCount } from "../../../utils/getContentTypeStringWithCount";
import { resourceTypes } from "../../resources/resourceTypes";
import Button from "../Button";
import ItemWithImage from "../cells/ItemWithImage";
import { contentTypes } from "../contentTypes";
import useGetThumbnail from "../items/useGetThumbnail";
import Table from "./Table";


type ContentSelectTableProps = {
  recipientType: string
  recipient: Tag | Group
  selectedContentIds: string[]
  actionName: string
  contentType?: string
  rowSizing?: 'sm' | 'md' | 'lg'
  contentFilter: (content: any) => boolean
  filters?: string[]
  onSubmit: (contentIds: string[]) => void
  onRowSelect: (selectedIds: string[]) => void
}

const ContentSelectTable = ({ 
  contentType = 'content',
  selectedContentIds,
  rowSizing='sm',
  contentFilter,
  filters=['global'],
  recipient,
  recipientType,
  actionName,
  onRowSelect,
  onSubmit
}: ContentSelectTableProps) => {

  const type = contentTypes[contentType];
  
  const [getContent, { loading: contentLoading, data: content }] = useLazyQuery(type.gqlGetQuery, { 
    ...(type.gqlVariables && { variables: type.gqlVariables }),
    fetchPolicy: "network-only" });

  useEffect(() => {
    getContent();
  }, [getContent]);

  const contentNodes = content?.[type.pluralKey]?.edges.map(edge => edge.node)
  
  const actionNameCapitalised = actionName.charAt(0).toUpperCase() + actionName.slice(1)
  
  const availableContent = contentNodes?.filter(contentFilter) || []

  let recipientLabel

  switch (recipient.__typename) {
    case 'Tag':
      recipientLabel = recipient.label
      break;
    case 'Group':
      recipientLabel = recipient.name
      break;
  }

  const tableData = useMemo(() => availableContent, [availableContent]);

  const iconPaddingOptions = {
    sm: 'p-1.2',
    md: 'p-1.5',
    lg: 'p-1.8',
  };

  const iconPadding = iconPaddingOptions[rowSizing] || iconPaddingOptions.md;

  const tableCols = useMemo(() => [
    {
      header: "Content",
      accessorFn: row => row.title,

      cell: ({ cell }) => {
        const type = contentTypes[cell.row.original.itemType]
        
        const { src } = useGetThumbnail(cell.row.original, 50)
        const { contentType, itemType } = cell.row.original
        let icon = <type.icon className={iconPadding} />
        let rounded = 'full'
         
        if(itemType==='resource') {
          const IconComponent = (contentType === 'document') ? (
            getIconFromFilename(cell.row.original.document?.fileName)
          ) : (
            resourceTypes[contentType]?.icon
          )
          icon = <IconComponent className={iconPadding}  />
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

  let buttonLabel = `No ${type.plural} selected`

  if(selectedContentIds.length) {
    const contentTypeStringWithCount = getContentTypeStringWithCount(type, selectedContentIds.length)
    buttonLabel = `${actionNameCapitalised} ${contentTypeStringWithCount} to ${recipientLabel}`
  }

  return (
    <>
      <Table
        tableData={tableData}
        tableCols={tableCols}
        filters={filters}
        scrollInTable={true}
        maxVisibleRows={9}
        selectedRowIds={selectedContentIds}
        isSelectable={true}
        onRowSelect={onRowSelect}
        rowSizing={rowSizing}
      />
      <Button
        disabled={!selectedContentIds.length}
        className="mt-4 -mb-4" onClick={() => onSubmit(selectedContentIds)}
      >
        {buttonLabel}
      </Button>
    </>
  );
}

ContentSelectTable.whyDidYouRender = true

export default ContentSelectTable
import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { ContentItem, Tag } from "../../../graphql/generated";
import { getIconFromFilename } from "../../../utils/getIconFromFilename";
import { resourceTypes } from "../../resources/resourceTypes";
import Button from "../Button";
import ItemWithImage from "../cells/ItemWithImage";
import { contentTypes } from "../contentTypes";
import useGetThumbnail from "../items/useGetThumbnail";
import Table from "./Table";


type ContentSelectTableProps = {
  recipientType: string
  recipient: Tag | ContentItem
  selectedContentIds: string[]
  actionName: string
  contentType?: string
  contentFilter: (content: any) => boolean
  filters?: string[]
  onSubmit: (contentIds: string[]) => void
  onRowSelect: (selectedIds: string[]) => void
}

const ContentSelectTable = ({ contentType = 'content', selectedContentIds, contentFilter, filters=['global'], recipientType, recipient, actionName, onRowSelect, onSubmit }: ContentSelectTableProps) => {

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
    case 'ContentItem':
      recipientLabel = recipient.title
      break;
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
        filters={filters}
        scrollInTable={true}
        maxVisibleRows={9}
        selectedRowIds={selectedContentIds}
        isSelectable={true}
        onRowSelect={onRowSelect}
        rowSizing='sm'
      />
      {!!selectedContentIds.length && (
        <Button className="mt-4 -mb-4" onClick={() => onSubmit(selectedContentIds)}>
          {`${actionNameCapitalised} ${selectedContentIds.length} content
          item${selectedContentIds.length > 1 ? 's' : ''} to ${recipientLabel}`}
        </Button>
      )}
    </>
  );
}

ContentSelectTable.whyDidYouRender = true

export default ContentSelectTable
import { useMemo, useState } from 'react';
import Table from '../common/tables/Table'
import ItemWithImage from '../common/cells/ItemWithImage';
import TagSelect from '../tags/inputs/TagSelect';
import LoadingSpinner from '../common/LoadingSpinner';
import { GraduationCap } from 'styled-icons/fa-solid';
import { usePathwayStore } from './usePathwayStore';

const SelectContentTable = ({
  contentItems, 
  typeName, 
  onRowSelect,
  loading,
  error
}) => {

  const items = usePathwayStore(state => state.items)
  
  const [ categoryId, setCategoryId ] = useState(null)

  // Table data is memo-ised due to this:
  // https://github.com/tannerlinsley/react-table/issues/1994
  const tableData = useMemo(
    () => {
      let data = contentItems?.filter(node => {
        return !node._deleted
      }).filter(contentItem => {
        return !items.some(item => item.id === contentItem.id)
      })
      
      if(categoryId) {
        data = data?.filter(item => {
          return item?.tags?.some(tag => tag.id === categoryId)
        })
      }

      return data || []
    }, [contentItems, categoryId, items]
  );

  const tableCols = useMemo(
    () => [
      {
        header: `${typeName.charAt(0).toUpperCase() + typeName.slice(1)} Name`,
        accessorKey: "title", // accessor is the "key" in the data
        cell: ({ cell }) => (
          <ItemWithImage
            image={cell.row.original.image}
            icon={<GraduationCap className='p-1'/>}
            title={cell.getValue()}
            secondary={cell.row.original?.tags?.map?.(tag => tag.label).join(', ')}
          />
        )
      }
    ],
    []
  );

  const clearFilters = () => {
    setCategoryId(null)
  }

  const tableProps = {
    tableData,
    tableCols,
    selectable: true
  }

  return (
    <>
      <div className='flex items-center flex-col mb-2 sm:justify-between sm:flex-row'>
        <div className='flex items-center flex-col sm:flex-row'>
          <TagSelect selected={categoryId} tagType={`category`} onSelect={tag => setCategoryId(tag.id)} />
          <span className={`text-main-secondary hover:text-main p-1 px-3 cursor-pointer`} onClick={clearFilters}>clear filters</span>
        </div>
        <p>Showing {tableData.length} {typeName || 'item'}s</p>
      </div>

      { loading && (
        <LoadingSpinner />
      )}
      { error && (
        <p>Unable to fetch {typeName || 'item'}s.</p>
      )}
      { (!loading && !error) && (
        <Table 
          {...tableProps}
          rowProps={row => ({
            onClick: () => onRowSelect(row.original),
            style: {
              cursor: "pointer"
            }
          })}
         />
      )}
    </>
  );
}

export default SelectContentTable

import React, { useMemo } from 'react';
import useGetResources from '../../hooks/resources/useGetResources';
import ItemWithImage from '../common/cells/ItemWithImage';
import { resourceTypes } from '../resources/resourceTypes';
import LoadingSpinner from '../common/LoadingSpinner';
import { Dot } from '../common/misc/Dot';
import { startCase } from 'lodash';
import useGetThumbnail from '../common/items/useGetThumbnail';
import { getIconFromFilename } from '../../utils/getIconFromFilename';
import Table from '../common/tables/Table';
import ResourceActionsMenu from './ResourceActionsMenu';
import { contentTypes } from '../common/contentTypes';
import ContentTable from '../common/tables/ContentTable';

const ResourcesTable = () => {

  const { loading, error, resources } = useGetResources()
  const tableProps = {
    filters: ['category', 'global', 'contentType'],
    typeOptions: resourceTypes
  }
  const type = contentTypes['resource']

  return (
    <ContentTable
    content={resources} 
    tableProps={tableProps}
    type={type} loading={loading} error={error} ActionsMenuComponent={ResourceActionsMenu} />
  )
}

export default ResourcesTable

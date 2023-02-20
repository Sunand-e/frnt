import useGetPathways from '../../../hooks/pathways/useGetPathways';
import PathwayActionsMenu from './PathwayActionsMenu';
import ContentTable from '../../common/tables/ContentTable';
import { contentTypes } from '../../common/contentTypes';

const PathwaysTable = () => {

  const { loading, error, pathways } = useGetPathways()
  const type = contentTypes['pathway']
  
  return (
    <ContentTable content={pathways} type={type} loading={loading} error={error} ActionsMenuComponent={PathwayActionsMenu} idKey='pid' />
  )
}

export default PathwaysTable


import Filters from '../common/Filters';
import { resourceTypes } from '../resources/resourceTypes';

export default function ResourceLibraryFilters() {
  
  return (
    <Filters types={resourceTypes} />
  )
}

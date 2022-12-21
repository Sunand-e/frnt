import Filters from '../common/Filters';
import { resourceTypes } from './resourceTypes';

export default function ResourceFilters() {
  
  return (
    <Filters types={resourceTypes} hasCategories={true} />
  )
}

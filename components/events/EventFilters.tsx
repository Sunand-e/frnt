import Filters from '../common/Filters';
import {eventItemTypes} from "./eventItemTypes";

export default function EventFilters() {
  
  return (
    <Filters types={eventItemTypes} />
  )
}

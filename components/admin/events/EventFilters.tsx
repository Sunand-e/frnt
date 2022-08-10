import Filters from '../../common/Filters';
import {eventItemTypes} from "../../events/eventItemTypes";

export default function EventFilters() {
  
  return (
    <Filters types={eventItemTypes} />
  )
}

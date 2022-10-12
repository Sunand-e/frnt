
import Button from "../common/Button";
import { eventItemTypes } from "./eventItemTypes";

const eventTypesArray = Object.keys(eventItemTypes).map(key => {
  return {
    ...eventItemTypes[key],
    value: key
  }
});


const EventTypeSelector = ({onSelect: handleSelect}) => {

  return (
    <div className="p-8 bg-white shadow rounded-md flex justify-center flex-col sm:flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {/* <pre>
      { JSON.stringify(eventTypesArray,null,2) }
      </pre> */}
{/* 
      { eventItemTypes.map(type => (

<div>
<VideoPersonCall />
</div>
      )) } */}

      <Button onClick={() => handleSelect('PhysicalEvent')} className="mr-0 mb-4 sm:mr-4 sm:mb-0">Add Physical Event</Button>



      <Button onClick={() => handleSelect('VirtualEvent')}>Add Virtual Event</Button>


    </div>
  )
}

export default EventTypeSelector

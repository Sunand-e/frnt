import Button from "../Button";

const EventTypeSelector = ({onSelect: handleSelect}) => {

  return (
    <div className="w-full text-center p-8 bg-white shadow rounded-md">
      <Button onClick={() => handleSelect('PhysicalEvent')} className="mr-4">Add Physical Event</Button>
      <Button onClick={() => handleSelect('VirtualEvent')}>Add Virtual Event</Button>
    </div>
  )
}

export default EventTypeSelector

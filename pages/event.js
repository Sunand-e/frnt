import { useState } from 'react'
import ContentTypePage from "../components/ContentTypePage";
import Sidebar from '../components/Sidebar.js';
import BlockWithTitle from '../components/BlockWithTitle.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import EventDetails from '../components/EventDetails.js';

export default function Event() {

  const [event, setEvent] = useState('');

  return (
    <ContentTypePage type="Event" setData={setEvent}>
      <div className="flex-grow w-9/12">
        { !event && <LoadingSpinner /> }
        { event && <div className="mb-8" dangerouslySetInnerHTML={{__html: event.content}} /> }
      </div>
      <Sidebar>
        <BlockWithTitle title="Event Details">
          { !event && <LoadingSpinner className="transform scale-50"/> }
          { event && <EventDetails event={event} /> }
        </BlockWithTitle>
      </Sidebar>
    </ContentTypePage>
  )
}

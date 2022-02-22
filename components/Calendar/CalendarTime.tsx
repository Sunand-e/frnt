import React, { useRef } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
// The import order DOES MATTER here. If you change it, you'll get an error!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const CalendarTime = () => {
  const calendarRef = useRef(null)

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[timeGridPlugin, interactionPlugin]}
      editable
      selectable
    />
    
  )
}

export default CalendarTime
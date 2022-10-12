import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
// The import order DOES MATTER here. If you change it, you'll get an error!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const CalendarDay = () => {  
  return (
    <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
    />
    
  )
}

export default CalendarDay
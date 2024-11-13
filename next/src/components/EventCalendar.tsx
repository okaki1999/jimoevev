import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'

const EventCalendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={[
        { title: 'event 1', date: '2024-11-12' },
        { title: 'event 2', date: '2024-11-14' },
      ]}
    />
  )
}

export default EventCalendar

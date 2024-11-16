import { EventClickArg } from '@fullcalendar/core/index.js'
import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Container,
  CardMedia,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Event {
  title: string
  date: string
  content?: string
  image_url: string
}

const EventsCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/events')
        const eventData = response.data.map(
          (event: {
            title: string
            start_at: string
            content?: string
            image_url: string
          }) => ({
            title: event.title,
            date: event.start_at,
            content: event.content,
            image_url: event.image_url, //
          }),
        )
        setEvents(eventData)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }

    fetchEvents()
  }, [])

  const handleEventClick = (clickInfo: EventClickArg) => {
    const clickedEvent = events.find(
      (event) => event.title === clickInfo.event.title,
    )
    setSelectedEvent(clickedEvent || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  return (
    <Box sx={{ backgroundColor: '#e6f2ff', minHeight: '100vh', py: 4 }}>
      <Container>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locales={[jaLocale]}
          locale="ja"
          events={events}
          eventClick={handleEventClick}
        />

        {/* モーダルの実装 */}
        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <DialogTitle>イベントの詳細</DialogTitle>
          <DialogContent>
            {selectedEvent ? (
              <>
                {selectedEvent.image_url && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={selectedEvent.image_url}
                    alt={selectedEvent.title}
                    sx={{ borderRadius: 2, marginBottom: 2 }}
                  />
                )}
                <Typography variant="h6">{selectedEvent.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  日時: {selectedEvent.date}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {selectedEvent.content || '詳細情報はありません'}
                </Typography>
              </>
            ) : (
              <Typography>イベント情報が見つかりません</Typography>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  )
}

export default EventsCalendar

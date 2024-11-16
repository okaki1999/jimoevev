import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import FetchImage from '@/components/FetchImage'

interface Event {
  id: number
  title: string
  content: string
  start_at: string
  created_at: string
  updated_at: string
  image_url: string | null
}

interface EventsListProps {
  apiUrl: string
  headers?: Record<string, string>
}

const EventsList: React.FC<EventsListProps> = ({ apiUrl, headers }) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(apiUrl, { headers })
        setEvents(response.data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('不明なエラーが発生しました')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [apiUrl, headers])

  if (loading) return <CircularProgress />
  if (error) return <p>Error: {error}</p>

  return (
    <Box sx={{ backgroundColor: '#e6f2ff', minHeight: '100vh', py: 4 }}>
      <Container>
        <Typography variant="h4" component="h1" textAlign="center" marginY={4}>
          イベント一覧
        </Typography>
        <Grid container spacing={4} justifyContent="flex-start">
          {events.length > 0 ? (
            events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card
                  onClick={() => router.push(`/events/${event.id}`)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  {event.image_url && (
                    <CardMedia>
                      <FetchImage avatarUrl={event.image_url} />
                    </CardMedia>
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {event.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {event.content}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      開催日時: {new Date(event.start_at).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>イベントがありません</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  )
}

export default EventsList

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Event {
  id: number
  title: string
  content: string
  image_url: string | null
}

const UserEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // localStorageからトークン情報を取得
        const accessToken = localStorage.getItem('access-token')
        const client = localStorage.getItem('client')
        const uid = localStorage.getItem('uid')

        // ヘッダーを含めてリクエスト
        const response = await axios.get(
          'http://localhost:3000/api/v1/users/events',
          {
            headers: {
              'access-token': accessToken || '',
              client: client || '',
              uid: uid || '',
            },
          },
        )
        setEvents(response.data)
      } catch (error) {
        console.error('Error fetching user events:', error)
        setError('イベントを取得できませんでした。')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) return <CircularProgress />
  if (error) return <p>{error}</p>

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" textAlign="center" marginY={4}>
        ユーザーのイベント一覧
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        {events.map((event) => (
          <Card key={event.id} sx={{ maxWidth: 345, marginBottom: 2 }}>
            {event.image_url && (
              <CardMedia
                component="img"
                height="140"
                image={event.image_url}
                alt={event.title}
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {event.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  )
}

export default UserEvents

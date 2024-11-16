import {
  Container,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Button,
} from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

interface Event {
  id: number
  title: string
  content: string
  image_url: string | null
  created_at: string
  updated_at: string
  user_id: number // 作成者のユーザーIDを追加
}

const EventDetail: React.FC = () => {
  const router = useRouter()
  const { id } = router.query // URLパラメータからIDを取得
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id')
    if (storedUserId) {
      setCurrentUserId(parseInt(storedUserId, 10))
    }

    if (id) {
      const fetchEvent = async () => {
        try {
          const accessToken = localStorage.getItem('access-token') || ''
          const client = localStorage.getItem('client') || ''
          const uid = localStorage.getItem('uid') || ''

          const response = await axios.get(
            `http://localhost:3000/api/v1/events/${id}`,
            {
              headers: {
                'access-token': accessToken,
                client: client,
                uid: uid,
              },
            },
          )

          setEvent(response.data)
        } catch (error) {
          console.error('Error fetching event details:', error)
          setError('イベントの詳細を取得できませんでした。')
        } finally {
          setLoading(false)
        }
      }

      fetchEvent()
    }
  }, [id])
  console.log(currentUserId)

  // イベント削除関数
  const handleDeleteEvent = async () => {
    if (!event) return

    const accessToken = localStorage.getItem('access-token') || ''
    const client = localStorage.getItem('client') || ''
    const uid = localStorage.getItem('uid') || ''

    try {
      await axios.delete(
        `http://localhost:3000/api/v1/current/events/${event.id}`,
        {
          headers: {
            'access-token': accessToken,
            client: client,
            uid: uid,
          },
        },
      )
      router.push('/') // 削除後にイベント一覧ページにリダイレクト
    } catch (error) {
      console.error('Error deleting event:', error)
      setError('イベントを削除できませんでした。')
    }
  }

  if (loading) return <CircularProgress />
  if (error) return <p>{error}</p>

  return (
    <Container maxWidth="md" sx={{ marginY: 4 }}>
      {event ? (
        <Card sx={{ padding: 2 }}>
          {event.image_url && (
            <CardMedia
              component="img"
              height="300"
              image={event.image_url}
              alt={event.title}
              sx={{ borderRadius: 2, marginBottom: 2 }}
            />
          )}
          <Typography variant="h4" component="h1" marginBottom={2}>
            {event.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" marginBottom={2}>
            作成日: {new Date(event.created_at).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {event.content}
          </Typography>

          {currentUserId === event.user_id && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const isConfirmed = window.confirm('本当に削除しますか？')
                if (isConfirmed) {
                  handleDeleteEvent()
                }
              }}
              sx={{ color: 'white', marginTop: 3 }}
            >
              イベントを削除
            </Button>
          )}
        </Card>
      ) : (
        <Typography>イベントが見つかりませんでした。</Typography>
      )}
    </Container>
  )
}

export default EventDetail

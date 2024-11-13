import { Box, Card, CardMedia, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import FetchImage from '@/components/FetchImage'

// イベントデータの型を定義
interface Event {
  id: number
  title: string
  content: string
  created_at: string
  updated_at: string
  image_url: string | null
}

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // データを取得する関数
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/events')
      if (!response.ok) {
        throw new Error('データの取得に失敗しました')
      }
      const data = await response.json()
      setEvents(data)
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

  // コンポーネントのマウント時にデータを取得
  useEffect(() => {
    fetchEvents()
  }, [])

  if (loading) return <p>読み込み中...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography gutterBottom variant="h5" component="div">
        イベント一覧
      </Typography>
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <Card key={event.id} sx={{ maxWidth: 345, m: 4 }}>
              <li key={event.id}>
                {event.image_url && (
                  <CardMedia>
                    {event.image_url && (
                      <FetchImage avatarUrl={event.image_url} />
                    )}
                  </CardMedia>
                )}
                <Typography gutterBottom variant="h5" component="div">
                  タイトル：{event.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  本文：{event.content}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  作成日: {new Date(event.created_at).toLocaleDateString()}
                </Typography>
              </li>
            </Card>
          ))
        ) : (
          <p>イベントがありません</p>
        )}
      </ul>
    </Box>
  )
}

export default EventsList

import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { styles } from '@/styles'

const AddEvent: React.FC = () => {
  const router = useRouter()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [startAt, setStartAt] = useState<Date | null>(null)
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('event[title]', title)
    formData.append('event[content]', content)
    if (startAt) {
      formData.append('event[start_at]', startAt.toISOString())
    }
    if (image) {
      formData.append('event[image]', image)
    }

    // localStorageから各認証情報を取得
    const accessToken = localStorage.getItem('access-token')
    const client = localStorage.getItem('client')
    const uid = localStorage.getItem('uid')

    try {
      await axios.post(
        'http://localhost:3000/api/v1/current/events',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'access-token': accessToken || '', // access-tokenをヘッダーに追加
            client: client || '', // clientをヘッダーに追加
            uid: uid || '', // uidをヘッダーに追加
          },
        },
      )
      router.push('/')
    } catch (error) {
      console.error('Error creating event:', error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setImage(file)
  }

  return (
    <Box css={styles.pageMinHeight} sx={{ backgroundColor: '#e6f2ff' }}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" textAlign="center" marginY={4}>
          新しいイベントを追加
        </Typography>
        <Stack component="form" onSubmit={handleSubmit} spacing={4}>
          <TextField
            type="text"
            label="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ backgroundColor: 'white' }}
          />
          <TextField
            label="コンテンツ"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            sx={{ backgroundColor: 'white' }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="開始日時"
              value={startAt}
              onChange={(newValue) => setStartAt(newValue)}
              slotProps={{
                textField: {
                  required: true,
                  sx: { backgroundColor: 'white' },
                },
              }}
            />
          </LocalizationProvider>

          {image && (
            <Box textAlign="center">
              <Box
                component="img"
                src={URL.createObjectURL(image)}
                alt="選択された画像"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  mt: 1,
                  borderRadius: 2,
                }}
              />
            </Box>
          )}

          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: 'white',
              color: 'black',
              textTransform: 'none',
              fontSize: 16,
              borderRadius: 2,
              boxShadow: 'none',
              border: '1px solid #ccc',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                borderColor: '#999',
                boxShadow: 'none',
              },
            }}
          >
            画像を選択
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              color: 'white',
              textTransform: 'none',
              fontSize: 16,
              borderRadius: 2,
              boxShadow: 'none',
            }}
          >
            イベントを追加
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default AddEvent

import { Box, Button } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { styles } from '@/styles'

const AddEvent: React.FC = () => {
  const router = useRouter()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('event[title]', title)
    formData.append('event[content]', content)
    if (image) {
      formData.append('event[image]', image)
    }

    try {
      await axios.post('http://localhost:3000/api/v1/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      // イベントが作成されたらホームページにリダイレクト
      router.push('/')
    } catch (error) {
      console.error('Error creating event:', error)
      // エラーハンドリング
    }
  }

  return (
    <Box css={styles.pageMinHeight} sx={{ backgroundColor: '#e6f2ff' }}>
      <h1>新しいイベントを追加</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>コンテンツ</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>画像</label>
          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>
        <Button type="submit">イベントを追加</Button>
      </form>
    </Box>
  )
}

export default AddEvent

import { Box } from '@mui/material'
import type { NextPage } from 'next'
import useSWR from 'swr'
import { fetcher } from '@/utils'

const Index: NextPage = () => {
  const url = 'http://localhost:3000/api/v1/health_check'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  return (
    <Box sx={{ backgroundColor: '#e6f2ff', minHeight: '100vh' }}>
      <div>Rails疎通確認</div>
      <div>レスポンスメッセージ: {data.message}</div>
    </Box>
  )
}

export default Index

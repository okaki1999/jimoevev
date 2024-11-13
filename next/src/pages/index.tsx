import { Box } from '@mui/material'
import type { NextPage } from 'next'
import useSWR from 'swr'
// import EventCalendar from '@/components/EventCalendar'
import EventsList from '@/components/EventsList'
import { styles } from '@/styles'
import { fetcher } from '@/utils'

const Index: NextPage = () => {
  const url = 'http://localhost:3000/api/v1/health_check'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  return (
    <Box css={styles.pageMinHeight} sx={{ backgroundColor: '#e6f2ff' }}>
      {/* <EventCalendar /> */}
      <EventsList />
    </Box>
  )
}

export default Index

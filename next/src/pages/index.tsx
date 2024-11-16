import type { NextPage } from 'next'
import useSWR from 'swr'
// import EventCalendar from '@/components/EventCalendar'
import EventsList from '@/components/EventsList'
import { fetcher } from '@/utils'
import EventsCalendar from '@/components/EventsCalendar'

const Index: NextPage = () => {
  const url = 'http://localhost:3000/api/v1/health_check'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  return (<>
  <EventsCalendar/>
  {/* <EventsList apiUrl="http://localhost:3000/api/v1/events" /> */}
  </>)
}

export default Index

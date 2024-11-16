import React from 'react'
import EventsList from '@/components/EventsList'

const UserEventsPage: React.FC = () => {
  const accessToken = localStorage.getItem('access-token') || ''
  const client = localStorage.getItem('client') || ''
  const uid = localStorage.getItem('uid') || ''

  return (
    <EventsList
      apiUrl="http://localhost:3000/api/v1/current/events"
      headers={{
        'access-token': accessToken,
        client,
        uid,
      }}
    />
  )
}

export default UserEventsPage

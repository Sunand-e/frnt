import Head from 'next/head'
import EventsListTable from '../../components/events/EventsListTable'
import usePageTitle from '../../hooks/usePageTitle'

const Events = () => {

  usePageTitle({ title: 'All Events' })

  return (
    <>
      <Head>
        <title>Events | Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EventsListTable />
    </>
  )
}

Events.navState = {
  topLevel: 'events',
}

export default Events

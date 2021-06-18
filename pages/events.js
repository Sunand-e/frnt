import Head from 'next/head'
// import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useQuery, useMutation, gql } from '@apollo/client';
import NoticeBox from '../components/NoticeBox.js';
import PageTitle from '../components/PageTitle.js';
import PageContent from '../components/PageContent.js';

export default function Workshops() {

  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle
        title='Upcoming Events'
        subtitle="Join us in our next members-only workshop"
      />
      <PageContent>
        <NoticeBox>
          <h1><span className="uppercase">Pick up where you left off:</span> <em>Know your why</em></h1>
        </NoticeBox>
      </PageContent>
    </>
  )
}

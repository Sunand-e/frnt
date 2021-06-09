import { useState } from 'react';
import Head from 'next/head'
// import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useQuery, useMutation, gql } from '@apollo/client';
import InfoBox from '../components/InfoBox.js';
import PageContent from '../components/PageContent.js';
import PageTitle from '../components/PageTitle.js';
export default function Forum() {

  const [forum, setForum] = useState('');

  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle
        title = 'Community Forum'
        subtitle = "Read the latest topics from the community or start one of your own!"
      />
      <PageContent>
      <InfoBox>
        <h1>List of topics</h1>
      </InfoBox>
      </PageContent>
      {/* {JSON.stringify(data, null, 4)} */}
      {/* {
        data.posts.nodes.map(({ id, content }) => (
          <div key={id}>
            <p>
              {id}: {content}
            </p>
          </div>
        ))
      } */}
    </>
  )
}

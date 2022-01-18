import { useState } from 'react'
import Head from 'next/head'
import { useQuery, useMutation, gql } from '@apollo/client'
import NoticeBox from '../../components/NoticeBox'
import PageContent from '../../components/PageContent'
import usePageTitle from '../../hooks/usePageTitle'

const Community = () => {

  usePageTitle({
    title: 'Community Forum',
    subtitle: "Read the latest topics from the community or start one of your own!"
  })

  const [community, setCommunity] = useState('');

  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent>
      <NoticeBox>
        <h1>List of topics</h1>
      </NoticeBox>
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

Community.navState = {
  topLevel: 'community'
}

export default Community
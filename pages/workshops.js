import Head from 'next/head'
// import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useQuery, useMutation, gql } from '@apollo/client';
import InfoBox from '../components/InfoBox.js';

// const QUERY = gql`
// query GetPosts {
//   posts {
//     nodes {
//       id
//       content
//     }
//   }
// }
// `;

export default function Workshops() {

  // const { loading, error, data } = useQuery(QUERY);

  // if (loading) return <p>Loading...</p>;

  // if (error) {
  //   return <p>Error :(</p>;
  // }

  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InfoBox>
        <h1><span className="uppercase">Pick up where you left off:</span> <em>Know your why</em></h1>
      </InfoBox>
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

Workshops.title = 'Workshops';
Workshops.subtitle = "Join us in our next members-only workshop";
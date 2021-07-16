import Head from 'next/head'
// import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useQuery, useMutation, gql } from '@apollo/client';
import NoticeBox from '../components/NoticeBox';
import PageTitle from '../components/PageTitle';

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

const MyAccount = () => {

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
      
      <PageTitle 
        title='My Account'
      />
      <NoticeBox>
        <h1><span className="uppercase">Pick up where you left off:</span> <em>Know your why</em></h1>
      </NoticeBox>
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

export default MyAccount
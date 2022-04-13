import Head from 'next/head'
import { useQuery, useMutation, gql } from '@apollo/client';
import NoticeBox from '../components/NoticeBox';
import usePageTitle from '../hooks/usePageTitle'

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
  usePageTitle( { title: 'My Account' } )


  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <NoticeBox>
        <h1><span className="uppercase">Pick up where you left off:</span> <em>Know your why</em></h1>
      </NoticeBox>
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
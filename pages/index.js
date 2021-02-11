import Head from 'next/head'
import Layout from '../components/layouts/Layout.js'
import styles from '../styles/Home.module.css'
// import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useQuery, useMutation, gql } from '@apollo/client';
import InfoBox from '../components/InfoBox.js';
import ItemGrid from '../components/ItemGrid.js';

const QUERY = gql`
query GetPosts {
  posts {
    nodes {
      id
      title
      excerpt
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
`;

export default function Dashboard() {

  const { loading, error, data } = useQuery(QUERY);
  
  if (loading) return <p>Loading...</p>;
  
  if (error) {
    return <p>Error :(</p>;
  }
    
  const posts = data.posts.nodes

  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InfoBox>
        <h1><span className="uppercase">Pick  up where you left off:</span> <em>Know your why</em></h1>
      </InfoBox>
      <ItemGrid items={posts}></ItemGrid>
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

// Home.getLayout = page => <Layout>{page}</Layout>
Dashboard.title = 'Welcome to your Dashboard';
Dashboard.subtitle = '...where you can find the latest resources for your membership';
Dashboard.sidebar = true;

/*
export async function getStaticProps() {

  const { data } = await client.query({
    query: gql`
      query GetLogin {
        posts {
          nodes {
            id
          }
        }
      }
    `
  });

  
  // const loginInfo = await client.query({
  //   mutation: gql`
  //     mutation LoginUser {
  //       login( input: {
  //         clientMutationId: "uniqueId",
  //         username: "your_login",
  //         password: "your password"
  //       } ) {
  //         authToken
  //         user {
  //           id
  //           name
  //         }
  //       }
  //     }
  //   `
  // })
  // const { data } = await client.query({
  //   query: gql`
  //     query GetLogin {
  //       viewer {
  //         email
  //       }
  //     }
  //   `
  // });

  return {
    props: {
      launches: data.posts.nodes
    }
  }
}
*/
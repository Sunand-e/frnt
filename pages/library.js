import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
// import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useQuery, useMutation, gql } from '@apollo/client';
import contentTypes from '../contentTypes';
import ItemCollection from '../components/ItemCollection';
import SearchFilter from '../components/SearchFilter';
import SearchResults from '../components/SearchResults';

const contentTypesGQL = `[
  ${
    contentTypes.reduce(( accumulator, currentValue, index, array) => {
      return accumulator += 'SM_' + currentValue.slug.toUpperCase() + ', ';
    }, '')
  }
]`
const gqlQuery = `
query SmartMembersContent {
  contentNodes(first:3, where: {contentTypes: ${contentTypesGQL}}) {
    nodes {
      __typename
      id
      slug
      ... on NodeWithTitle {
        title
      }
      ... on NodeWithExcerpt {
        excerpt
      }
      ... on NodeWithContentEditor {
        content
      }
      ... on NodeWithFeaturedImage {
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      contentType {
        node {
          name
          labels {
            name
          }
        }
      }
      ... on SmContentInterface {
        buttonText
        contentTagss {
          nodes {
            id
            slug
            name
          }
        }
      }
    }
  }
  contentTags {
    nodes {
      id
      slug
      name
      contentNodes {
        nodes {
          id
        }
      }
    }
  }
}
`
const QUERY = gql`${gqlQuery}`;
// console.log(gqlQuery)

export default function Library({ launches }) {
  const [ items, setItems ] = useState([])
  const [ tags, setTags ] = useState([])
  const [ searchParams, setSearchParams ] = useState(
    {
      text: '',
      type: '',
      tag: ''
    }
  );

  const { loading, error, data } = useQuery(QUERY);
  
  useEffect(() => {
    console.log('useEffect');
    if(data) {
      console.log('useEffect with data');
      setItems(data.contentNodes.nodes);
      setTags(data.contentTags.nodes)
    }
  }, [data, loading])

  const searching = (searchParams.text || searchParams.type || searchParams.tag)
 
  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchFilter tags={tags} searchParams={searchParams} setSearchParams={setSearchParams} />

      { !loading && ( searching ?
        <SearchResults 
          tags={tags} 
          items={items} 
          searchParams={searchParams}
        /> :
        contentTypes.map((type, index) => {
          let options = { heading: type.pluralName }
          return <ItemCollection key={index} items={data.contentNodes.nodes} options={options} />
        })
      )}
    </>
  )
}

Library.title = 'Library';
Library.subtitle = 'Take a look through our library of courses and resources';

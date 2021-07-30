import { gql } from '@apollo/client';
import contentTypes from '../../contentTypes';
import { ContentTagFragment } from '../fragments/ContentTagFragment';

import metaFragments from '../fragments/metaFragments';

export const GET_ALL_CONTENT = gql`
  query GetAllContent {
    __schema
  }
`
/*
const contentTypeQueryBits = contentTypes.reduce(
  ( accumulator, currentValue, index, array) => {
      const gqlName = currentValue.name.replace(/\s/g, '');
      const prefix = currentValue?.prefix ?? ''
      accumulator.gql_types += prefix + currentValue.slug.toUpperCase() + ', ';
      accumulator.fragmentsString += `
        ... on ${gqlName} {
          ...${gqlName}Meta
        }
      `
      accumulator.fragmentDefinitions += gql`${metaFragments[gqlName+'MetaFragment']}`
    return accumulator
  }, {
  gql_types: '',
  fragmentsString: '',
  fragmentDefinitions: ''
})

let metaFragmentGql = ''
for (const fragment in metaFragments) {
  metaFragmentGql += fragment
}
// Define the query for the entire library, using the contentTypesGQL string
export const GET_ALL_CONTENT___OLD = gql`
  query GetAllContent {
    contentNodes(first:1000, where: {
      contentTypes: [${contentTypeQueryBits.gql_types}]
      orderby: {
        field:DATE
        order:DESC
      }
    }) {
      nodes {
        __typename
        id
        slug
        date
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
              ...ContentTagFragment
            }
          }
        }
        ${`${contentTypeQueryBits.fragmentsString}`}
      }
    }
  }
  ${ContentTagFragment}
  ${metaFragments.DocumentMetaFragment}
  ${metaFragments.EventMetaFragment}
  ${metaFragments.CourseMetaFragment}
  ${metaFragments.PodcastMetaFragment}
  ${metaFragments.PostMetaFragment}
  ${metaFragments.ProcessFlowMetaFragment}
  ${metaFragments.ProgrammeMetaFragment}
  ${metaFragments.ResourceMetaFragment}
  ${metaFragments.SnapshotMetaFragment}
  ${metaFragments.WebinarMetaFragment}
  ${metaFragments.WorkshopMetaFragment} 
`
*/

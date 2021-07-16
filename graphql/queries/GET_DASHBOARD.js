import { gql } from '@apollo/client';
import contentTypes from '../../contentTypes';
import { ContentTagFragment } from '../fragments/ContentTagFragment';
import { DocumentMetaFragment } from '../fragments/DocumentMetaFragment';
import metaFragments from '../fragments/metaFragments';

// Generate the string of all graphQL types for the library query

export const GET_DASHBOARD = gql`
  query GetDashboard {
    contentItems {
      title
    }
  }
`
/*
const contentTypeQueryBits = contentTypes.reduce(( accumulator, currentValue, index, array) => {
  if(currentValue.notInLibrary !== true) {
    const gqlName = currentValue.name.replace(/\s/g, '');
    
    const prefix = currentValue?.prefix ?? ''
    accumulator.gql_types += prefix + currentValue.slug.toUpperCase() + ', ';

    accumulator.fragmentsString += `
      ... on ${gqlName} {
        ...${gqlName}Meta
      }
    `
    accumulator.fragmentDefinitions += gql`${metaFragments[gqlName+'MetaFragment']}`
  }
  return accumulator
}, {
  gql_types: '',
  fragmentsString: '',
  fragmentDefinitions: ''
})

export const GET_DASHBOARD___OLD = gql`
  query GetDashboard {
    contentNodes(first:4, where: {
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
    posts(first:4) {
      nodes {
        id
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
    events(first:4) {
      nodes {
        id
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
    contentTags {
      nodes {
        ...ContentTagFragment
      }
    }
  }
  ${ContentTagFragment}
  ${metaFragments.DocumentMetaFragment}
  ${metaFragments.CourseMetaFragment}
  ${metaFragments.PodcastMetaFragment}
  ${metaFragments.ProcessFlowMetaFragment}
  ${metaFragments.ProgrammeMetaFragment}
  ${metaFragments.SnapshotMetaFragment}
  ${metaFragments.WebinarMetaFragment}
  ${metaFragments.WorkshopMetaFragment} 
`
// ${gql`${contentTypeQueryBits.fragmentDefinitions}`}
*/
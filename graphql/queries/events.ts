import { gql } from '@apollo/client';

export const EventFragment = gql`
  fragment EventFragment on Event {
    title
    content
    createdAt
    eventModelType
    id
    selfRegistration
    startTime
    updatedAt
    duration
    eventModelId
    physicalEvent {
      location
    }
    virtualEvent {
      provider
    }
    _deleted @client
  }
`
export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      ...EventFragment
    }
  }
  ${EventFragment}
`

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      edges {
        node {
          ...EventFragment
        }
      }
    }
  }
  ${EventFragment}
`

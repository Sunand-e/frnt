import { gql } from '@apollo/client';

export const PodcastMetaFragment = gql`
fragment PodcastMeta on Podcast {
  uri
}
`
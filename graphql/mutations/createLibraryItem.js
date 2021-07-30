import { gql, useMutation } from '@apollo/client';

const CREATE_CONTENT_ITEM = gql`
  mutation CreateContentItem {
    __typename
    createCourse(input: 
      {
        params: 
        {
          title: "New course 2", 
          itemType: "course"
        }
      }
    ) {
      clientMutationId
      contentItem {
        id
        title
      }
    }
  }
  
`;
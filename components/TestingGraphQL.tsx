import { gql, useMutation } from '@apollo/client';
import Table from './Table';

const CONTENT_ITEM_FIELDS = gql`
fragment ContentItemFragment on ContentItem {
  id
  title
}
`

const CREATE_COURSE = gql`
  ${CONTENT_ITEM_FIELDS}
  mutation CreateCourse {
    __typename
    createCourse(input: 
      {
        params: 
        {
          title: "New courase 2", 
          itemType: "course"
        }
      }
    ) {
      clientMutationId
      contentItem {
        ...ContentItemFragment
      }
    }
  }
`;

const TestingGraphQL = () => {
  let input;
  const [addTodo, { data }] = useMutation(CREATE_COURSE);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>

      <Table />
    </div>
  );
}

export default TestingGraphQL
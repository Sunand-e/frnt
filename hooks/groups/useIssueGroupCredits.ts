import { ISSUE_GROUP_CREDITS } from "../../graphql/mutations/group/ISSUE_GROUP_CREDITS";
import { GET_GROUP } from "../../graphql/queries/groups";
import { gql, useFragment, useMutation, useQuery } from "@apollo/client";
import { GetGroup } from "../../graphql/queries/__generated__/GetGroup";

const GROUP_CREDITS_FRAGMENT = gql`
  fragment GroupFragment on Group {
    id
    creditTotal
  }
`;

function useIssueGroupCredits(groupId) {
  
  const { data: group } = useFragment({ 
    fragment: GROUP_CREDITS_FRAGMENT,
    from: { id: groupId, __typename: "Group", },
    optimistic: true
  });

  const [issueGroupCreditsMutation, issueGroupCreditsResponse] = useMutation<IssueGroupCredits, IssueGroupCreditsVariables>(
    ISSUE_GROUP_CREDITS
  );

  const issueGroupCredits = (groupId, creditIncrement) => {
    issueGroupCreditsMutation({
      variables: {
        groupId,
        creditIncrement
      },
      optimisticResponse: {
        issueGroupCredits: {
          __typename: 'IssueGroupCreditsPayload',
          group: {
            __typename: 'Group',
            id: groupId,
            creditTotal: group.creditTotal + creditIncrement,
          }
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    });
  };

  return {
    issueGroupCredits
  };
}

export default useIssueGroupCredits;
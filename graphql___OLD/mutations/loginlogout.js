
const LOGIN_QUERY = gql`
mutation LoginQuery {
  loginWithCookies(input: {password: "mo1929123!@#", login: "moadmin"}) {
    clientMutationId
    status
  }
}
`;
const LOGOUT_QUERY = gql`
mutation LogoutQuery {
  logout(input: {clientMutationId: "anything unique"}){
      clientMutationId
      status
  }
}`;


//For use in component's function:
const [login, { loading, error, data } ] = useMutation(LOGIN_QUERY);
const [logout, {} ] = useMutation(LOGOUT_QUERY);

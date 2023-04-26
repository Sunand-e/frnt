import getJWT from "../utils/getToken";
import Button from "./common/Button"

const ActAsUser = () => {
  
  const token = getJWT();
  const requestSwitchUser = () => {

    fetch(`/api/v1/user/531885cc-2b49-4ce4-9ee2-71ba1b5efbe3`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(result.token) {
          localStorage.setItem('actAsToken', result.token as string);
        } else if(result.error) {
          console.log('result')
          console.log(result)
          // setError(result.error)
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log('ERROR:')
        console.log(error)
        // this.setState({
        //   isLoaded: true,
        //   error
        // });
      }
    )
  }

  return (
    <Button onClick={requestSwitchUser}>Act as User</Button>
  )
}

export default ActAsUser
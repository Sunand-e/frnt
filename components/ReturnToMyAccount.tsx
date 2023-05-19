import { client } from "../graphql/client";
import Button from "./common/Button"

const ReturnToMyAccount = () => {

  const switchBack = () => {
    localStorage.removeItem('actAsToken');
    client.resetStore()
  } 

  return (
    localStorage.getItem('actAsToken') && (
      <Button onClick={switchBack}>Return to my account</Button>
    )
  )
}

export default ReturnToMyAccount
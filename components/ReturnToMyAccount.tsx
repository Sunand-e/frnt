import { client } from "../graphql/client";
import Button from "./common/Button"
import { deleteCookie, getCookie } from '../utils/cookieUtils';

const ReturnToMyAccount = () => {

  const switchBack = () => {
    deleteCookie('actAsUser');
    client.resetStore()
  } 

  return (
    getCookie('actAsUser') && (
      <Button onClick={switchBack}>Return to my account</Button>
    )
  )
}

export default ReturnToMyAccount
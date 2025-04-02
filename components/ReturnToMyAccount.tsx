import { client } from "../graphql/client";
import Button from "./common/Button"
import { deleteCookie } from '../utils/cookieUtils';
import { actingAsUser } from '../graphql/cache';
import { useReactiveVar } from '@apollo/client';

const ReturnToMyAccount = () => {

  const isActingAsUser = useReactiveVar(actingAsUser);

  const switchBack = () => {
    deleteCookie('actAsUser');
    actingAsUser(false);
    client.resetStore()
  }

  return (
    isActingAsUser && (
      <Button onClick={switchBack}>Return to my account</Button>
    )
  )
}

export default ReturnToMyAccount
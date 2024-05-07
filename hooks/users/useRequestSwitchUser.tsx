import getJWT from "../../utils/getToken";
import { client } from "../../graphql/client";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const useRequestSwitchUser = ({ user }) => {

  const router = useRouter();

  const requestSwitchUser = useCallback(() => {

    const token = getJWT();

    fetch(`/api/v1/user/act_as/${user.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result.token) {
            router.push('/').then(() => {
              localStorage.setItem('actAsToken', result.token as string);
              client.resetStore();
            });
          } else if (result.error) {
            alert('error');
          }
        },
        (error) => {
          console.log('ERROR:');
          console.log(error);
        }
      );
  }, []);

  return {
    requestSwitchUser
  };
};

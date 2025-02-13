import { client } from "../../graphql/client";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const useRequestSwitchUser = ({ user }) => {

  const router = useRouter();

  const requestSwitchUser = useCallback(() => {

    fetch(`/api/v1/user/act_as/${user.id}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.token) {
            router.push('/').then(() => {
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

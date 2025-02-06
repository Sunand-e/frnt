import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import cache from '../graphql/cache';

const useSendInvite = () => {

  const endpoint = '/api/v1/users/send_invitation'

  const sendInvite = useCallback(async (uids) => {
    const userIds = Array.isArray(uids) ? uids : [uids];
    await axios.request({
      method: "post", 
      url: endpoint,
      headers: {
      },
      data: {
        user_ids: userIds
      },
    }).then(response => {
      if(response.status === 200 && userIds?.length > 0) {
        toast(`${ userIds.length > 1 ? `${userIds.length} invitations` : 'Invitation'} sent.`, {
          toastId: 'changesSaved',
          hideProgressBar: true,
          autoClose: 2500
        })
        const currentDate = new Date();
        const isoString = currentDate.toISOString().slice(0, 19) + 'Z';
        response.data.user_ids.forEach(userId => {
          cache.modify({
            id: `User:${userId}`,
            fields: {
              invitationSentAt(cachedData) {
                return isoString;
              },
            },
          });
        })
      }
    })
  },[])

  return { sendInvite }
}

export default useSendInvite
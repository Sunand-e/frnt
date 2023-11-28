import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getJWT from '../utils/getToken';

const useSendInvite = () => {

  const endpoint = '/api/v1/users/send_invitation'

  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(getJWT())
  },[])

  const sendInvite = useCallback(async (uids) => {
    const userIds = Array.isArray(uids) ? uids : [uids];
    await axios.request({
      method: "post", 
      url: endpoint,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: {
        user_ids: userIds
      },
    }).then(data => {  
      console.log('then....')
      console.log(data)
      if(data.status === 200 && userIds?.length > 0) {
        toast(`${ userIds.length > 1 ? `${userIds.length} invitations` : 'Invitation'} sent.`, {
          toastId: 'changesSaved',
          hideProgressBar: true,
          autoClose: 2500
        })
      }
    })
  },[token])

  return { sendInvite }
}

export default useSendInvite
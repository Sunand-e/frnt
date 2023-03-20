import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import getJWT from '../utils/getToken';

const useSendInvite = () => {

  const endpoint = '/api/v1/users/send_invitation'

  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(getJWT())
  },[])

  const sendInvite = useCallback(async (userIds) => {
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
    })
  },[token])

  return { sendInvite }
}

export default useSendInvite
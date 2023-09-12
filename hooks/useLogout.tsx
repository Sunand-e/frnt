import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { isLoggedInVar } from '../graphql/cache';
import { client } from '../graphql/client';
import getJWT from '../utils/getToken';

const useLogout = () => {

  const router = useRouter()

  const endpoint = '/api/v1/user/sign_out'

  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(getJWT())
  },[])

  const logout = useCallback(async () => {
    await axios.request({
      method: "delete", 
      url: endpoint,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: {},
    }).then(data => {  
      isLoggedInVar(false)
      localStorage.removeItem('token')
      localStorage.removeItem('actAsToken')
      client.clearStore()
      router.push('/')
    })
  },[token])

  return { logout }
}

export default useLogout
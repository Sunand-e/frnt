import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { isLoggedInVar } from '../graphql/cache';
import { client } from '../graphql/client';

const useLogout = () => {

  const router = useRouter()

  const endpoint = '/api/v1/user/sign_out'

  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(localStorage.getItem('token'))
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
      client.clearStore()
      router.push('/')
    })
  },[token])

  return { logout }
}

export default useLogout
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { isLoggedInVar } from '../graphql/cache';
import { client } from '../graphql/client';
import { deleteCookie } from '../utils/cookieUtils';

const useLogout = () => {

  const router = useRouter()

  const endpoint = '/api/v1/user/sign_out'

  const logout = useCallback(async () => {
    await axios.request({
      method: "delete", 
      url: endpoint,
      data: {},
    }).then(data => {  
      isLoggedInVar(false);
      deleteCookie('actAsUser');
      deleteCookie('jwt_header_payload');
      client.clearStore();
      router.push('/');
    })
  },[])

  return { logout }
}

export default useLogout
import { isLoggedInVar } from '../graphql/cache';

const useLogout = () => {

  const logout = () => {
    isLoggedInVar(false)
    localStorage.removeItem('token')
    document.cookie = 'remember_user_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  return { logout }
}

export default useLogout
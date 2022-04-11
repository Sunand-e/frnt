import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar, viewVar } from '../graphql/cache';

const useView = () => {

  const view = useReactiveVar(viewVar)

  const toggleIsAdmin = (e) => {
    viewVar({
      ...view,
      isAdmin: !view.isAdmin
    })
    e.target.blur()
  }

  return { view, toggleIsAdmin }
}

export default useView
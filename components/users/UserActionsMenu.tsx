import ActionsMenu from "../common/menus/ActionsMenu"
import useDeleteUser from "../../hooks/users/useDeleteUser"
import useConfirmDelete from "../../hooks/useConfirmDelete"
import getJWT from "../../utils/getToken"
import { client } from "../../graphql/client"
import { useRouter } from "next/router"
import { useCallback } from "react"

const useRequestSwitchUser = ({user}) => {

  const router = useRouter()

  const requestSwitchUser = useCallback(() => {

    const token = getJWT()

    fetch(`/api/v1/user/act_as/${user.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(result.token) {    
          router.push('/').then(() => {
            localStorage.setItem('actAsToken', result.token as string);
            client.resetStore()
          })
        } else if(result.error) {
          alert('error')
        }
      },
      (error) => {
        console.log('ERROR:')
        console.log(error)
      }
    )
  },[])

  return { 
    requestSwitchUser
  }
}

const UserActionsMenu = ({user}) => {

  const editUrl = '/admin/users/edit'
  const editHref = user?.id && `${editUrl}?id=${user.id}`
 
  const { deleteUser } = useDeleteUser()
  const { confirmDelete } = useConfirmDelete({
    itemType: 'user',
    name: user.fullName,
    onConfirm: () => deleteUser(user.id)
  })

  const { requestSwitchUser } = useRequestSwitchUser({user})
  const menuItems = [
    { 
      label: 'Edit user', 
      href: editHref,
      capability: 'UpdateUser'
    },
    {
      label: 'Act as user',
      capability: 'ViewAsAnyUser',
      onClick: requestSwitchUser
    },
    {
      label: <span className="text-red-500">Delete user</span>, 
      capability: 'DeleteUser',
      onClick: confirmDelete
    },
  ]

  return (
    <ActionsMenu
      menuItems={menuItems}
      buttonText={'Actions'}
    />
  )
}

export default UserActionsMenu
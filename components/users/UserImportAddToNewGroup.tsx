import { Accordion } from "@mantine/core"
import { useRouter } from "next/router"
import { useContext } from "react"
import { ModalContext } from "../../context/modalContext"
import useCreateGroup from "../../hooks/groups/useCreateGroup"
import Button from "../common/Button"

const UserImportAddToNewGroup = ({userIds}) => {

  const { createGroup } = useCreateGroup()

  const { closeModal } = useContext(ModalContext)

  const router = useRouter()

  const backToUsers = () => {
    router.push('/admin/users')
    closeModal();
  }

  createGroup({
    name: '123'
  })

  return (
    <>

    <div className="flex flex-col space-y-2 w-full">
      
      <Button onClick={createGroup}>Create a group for these users</Button>


      <Button onClick={backToUsers}>Back to user list</Button>
    </div>
    </>
  )
}

export default UserImportAddToNewGroup
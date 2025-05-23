import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import useCreateGroup from "../../hooks/groups/useCreateGroup"
import { closeModal } from "../../stores/modalStore"
import Button from "../common/Button"
import TextInput from "../common/inputs/TextInput"

interface UserImportAddToNewGroupFormValues {
  name: string 
  email: string
  groupImage: string
  userRole: string
}

const UserImportAddToNewGroup = ({userIds}) => {

  const { register, handleSubmit, control, formState: { errors } } = useForm<UserImportAddToNewGroupFormValues>();

  const { createGroup } = useCreateGroup()

  const router = useRouter()

  const backToUsers = () => {
    router.push('/admin/users')
    closeModal();
  }

  const onSubmit = values => {
    const input = {
      ...values,
      userIds: userIds
    }
    createGroup(input)
    router.push('/admin/users/groups')
    closeModal()
  }

  return (
    <>
    <div className="flex flex-col space-y-2 w-full">
    <form
      className='h-full w-full max-w-3xl flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="Group name"
        placeholder="Group name"
        inputAttrs={register("name", { maxLength: 120 })}
      />
      <Button type="submit">Create group</Button>
      </form>
      <Button onClick={() => closeModal()}>Cancel</Button>
    </div>
    </>
  )
}

export default UserImportAddToNewGroup
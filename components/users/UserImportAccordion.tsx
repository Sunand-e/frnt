import { Accordion } from "@mantine/core"
import { useRouter } from "next/router"
import useIsOrganisationLeader from "../../hooks/users/useIsOrganisationLeader"
import { closeModal, handleModal } from "../../stores/modalStore"
import Button from "../common/Button"
import UserImportAddToNewGroup from "./UserImportAddToNewGroup"

const UserImportAccordion = ({data, groupId}) => {
  const { rows } = data
  
  const newUsers = rows.filter(row => row.status === 'new')
  const existingUsers = rows.filter(row => row.status === 'exists')
  const invalidRows = rows.filter(row => !['exists','new'].includes(row.status))
  const userIds = rows.filter(row => ['exists','new'].includes(row.status)).map(user => user.id)

  const router = useRouter()

  const { isOrganisationLeader } = useIsOrganisationLeader()

  const backToUsers = () => {
    router.push('/admin/users')
    closeModal();
  }

  const createGroup = () => {
    handleModal({
      title: 'Create new group',
      content: <UserImportAddToNewGroup userIds={userIds} />
    })
  }

  return (
    <>
    <Accordion defaultValue="">
      { !!newUsers.length && (
        <Accordion.Item value="new">
          <Accordion.Control>{newUsers.length} new users</Accordion.Control>
          <Accordion.Panel>
            <ul className="list-disc">
              { newUsers.map((row, idx) => (
                <li key={'new'+idx}>
                  {row.email}
                </li>
              ))}
            </ul>
          </Accordion.Panel>
        </Accordion.Item>
      )}

      { !!existingUsers.length && (
        <Accordion.Item value="existing">
          <Accordion.Control>{existingUsers.length} existing users</Accordion.Control>
          <Accordion.Panel>
            <ul className="list-disc">
              { existingUsers.map((row, idx) => (
                <li key={'existing'+idx}>
                  {row.email}
                </li>
              ))}
            </ul>
          </Accordion.Panel>
        </Accordion.Item>
      )}
      { !!invalidRows.length && (
        <Accordion.Item value="invalid">
          <Accordion.Control>{invalidRows.length} invalid row{invalidRows.length > 1 && 's'}</Accordion.Control>
          <Accordion.Panel>
            <ul className="list-disc">
              { invalidRows.map((row, idx) => (
                <li key={'invalid'+idx}>
                  {row.email || '(blank email)'}
                </li>
              ))}
            </ul>
          </Accordion.Panel>
        </Accordion.Item>
      )}
    </Accordion>
    <div className="flex flex-col space-y-2 w-full">

      { !isOrganisationLeader && !groupId && (
        <Button onClick={createGroup}>Create a group for these users</Button>
      )}

      <Button onClick={backToUsers}>Back to user list</Button>
    </div>
    </>
  )
}

export default UserImportAccordion
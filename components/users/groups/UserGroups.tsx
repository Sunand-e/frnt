import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from "../../../utils/router";
import BoxContainer from "../../common/containers/BoxContainer";
import AddUserToGroups from "./AddUserToGroups";
import UserGroupsTable from "./UserGroupsTable";
import {Group2} from "@styled-icons/remix-fill/Group2";
import { handleModal } from "../../../stores/modalStore";

const UserGroups = () => {

  const router = useRouter()

  const { id } = router.query

  const { loading, error, user } = useGetUser(id)

  const openAddUsersToGroups = () => {
    handleModal({
      title: `Assign user to groups`,
      content: <AddUserToGroups id={user.id} />
    })
  }

  const button = {
    text: "Assign to groups",
    onClick: openAddUsersToGroups
    // onClick: () => {
    //   router.push('/admin/users/groups')
    // }
  }

  return (
    <BoxContainer title="Groups" icon={Group2} button={button}>
        <UserGroupsTable />
    </BoxContainer>
  );
}

export default UserGroups
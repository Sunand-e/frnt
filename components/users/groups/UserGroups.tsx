import { useContext } from "react";
import { ModalContext } from "../../../context/modalContext";
import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from "../../../utils/router";
import BoxContainer from "../../common/containers/BoxContainer";
import AssignToGroupsModal from "./AssignToGroupsModal";
import UserGroupsTable from "./UserGroupsTable";
import {Group2} from "@styled-icons/remix-fill/Group2";

const UserGroups = () => {

  const router = useRouter()

  const { id } = router.query

  const { loading, error, user } = useGetUser(id)

  const { handleModal, closeModal } = useContext(ModalContext);

  const openAssignToGroupsModal = () => {
    handleModal({
      title: `Assign user to groups`,
      content: <AssignToGroupsModal userId={user.id} />
    })
  }

  const button = {
    text: "Assign to groups",
    // onClick: openAssignToGroupsModal
    onClick: () => {
      router.push('/admin/users/groups')
    }
  }

  return (
    <BoxContainer title="Groups" icon={Group2} button={button}>
        <UserGroupsTable />
    </BoxContainer>
  );
}

export default UserGroups
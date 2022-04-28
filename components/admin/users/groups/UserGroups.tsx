import { useContext } from "react";
import { ModalContext } from "../../../../context/modalContext";
import useGetUser from "../../../../hooks/users/useGetUser";
import { useRouter } from "../../../../utils/router";
import BoxContainer from "../../../common/containers/BoxContainer";
import AssignToGroupsModal from "./AssignToGroupsModal";
import UserGroupsTable from "./UserGroupsTable";

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
    onClick: openAssignToGroupsModal
  }

  return (
    <BoxContainer title="Groups" button={button}>
        <UserGroupsTable />
    </BoxContainer>
  );
}

export default UserGroups
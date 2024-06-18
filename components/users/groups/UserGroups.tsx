import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from "../../../utils/router";
import BoxContainer from "../../common/containers/BoxContainer";
import AddUserToGroups from "./AddUserToGroups";
import UserGroupsTable from "./UserGroupsTable";
import {Group2} from "@styled-icons/remix-fill/Group2";
import { handleModal } from "../../../stores/modalStore";
import useTenantFeaturesEnabled from "../../../hooks/users/useTenantFeaturesEnabled";

const UserGroups = () => {

  const router = useRouter()
  const { id } = router.query
  const { loading, error, user } = useGetUser(id)
  const { tenantFeaturesEnabled } = useTenantFeaturesEnabled()

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

  const boxTitle = tenantFeaturesEnabled(['organisations']) ? 'Groups / Organisations' : 'Groups'
  return (
    <BoxContainer title={boxTitle} icon={Group2} button={button}>
        <UserGroupsTable scrollInTable={true} />
    </BoxContainer>
  );
}

export default UserGroups
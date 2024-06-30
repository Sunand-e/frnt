import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from "../../../utils/router";
import BoxContainer from "../../common/containers/BoxContainer";
import AddUserToGroups from "./AddUserToGroups";
import UserGroupsTable from "./UserGroupsTable";
import {Group2} from "@styled-icons/remix-fill/Group2";
import { handleModal } from "../../../stores/modalStore";
import useTenantFeaturesEnabled from "../../../hooks/users/useTenantFeaturesEnabled";
import { groupTypes } from "../../common/groupTypes";

const UserGroups = ({groupTypeName='group', isSingular=false}) => {

  const router = useRouter()
  const { id } = router.query
  const { loading, error, user } = useGetUser(id)
  const groupType = groupTypes[groupTypeName]


  const openAddUsersToGroups = () => {
    handleModal({
      title: `Assign user to ${isSingular ? groupType.name : groupType.plural}`,
      content: <AddUserToGroups groupTypeName={groupTypeName} isSingular={isSingular} id={user.id} />
    })
  }

  const button = {
    text: `Assign to ${isSingular ? groupType.name : groupType.plural}`,
    onClick: openAddUsersToGroups
    // onClick: () => {
    //   router.push('/admin/users/groups')
    // }
  }

  // const boxTitle = tenantFeaturesEnabled(['organisations']) ? 'Groups / Organisations' : 'Groups'
  return (
    <BoxContainer title={isSingular ? groupType.label : groupType.pluralLabel} icon={Group2} button={button}>
        <UserGroupsTable typeName={groupTypeName} scrollInTable={true} />
    </BoxContainer>
  );
}

export default UserGroups
import { Library } from "@styled-icons/ionicons-solid/Library";
import useGetUser from "../../../hooks/users/useGetUser";
import { handleModal } from "../../../stores/modalStore";
import { useRouter } from "../../../utils/router";
import BoxContainer from "../../common/containers/BoxContainer";
import EnrolUserInContent from "../content/EnrolUserInContent";
import UserResourcesTable from "./UserResourcesTable";

const UserResources = () => {
  
  const router = useRouter()
  const { id } = router.query
  const { user, loading, error } = useGetUser(id)

  const button = {
    text: "Assign resources",
    onClick: () => {
      handleModal({
        title: 'Enrol user in resources',
        content: <EnrolUserInContent user={user} typeName='resource' />
      })
    }
  }

  return (
    <BoxContainer title="Resources" icon={Library} button={button}>
      <UserResourcesTable />
    </BoxContainer>
    
  );
}

export default UserResources
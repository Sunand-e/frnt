import BoxContainer from "../../common/containers/BoxContainer";
import {Library} from "@styled-icons/ionicons-solid/Library"
import { useContext } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from "../../../utils/router";
import UserResourcesTable from "./UserResourcesTable";
import useGetUserResources from "../../../hooks/users/useGetUserResources";
import EnrolUserInContent from "../content/EnrolUserInContent";
import { handleModal } from "../../../stores/modalStore";
import useGetResources from "../../../hooks/resources/useGetResources";

const UserResources = () => {
  
  const router = useRouter()
  const { id } = router.query
  const { user, loading, error } = useGetUser(id)

  const { resources } = useGetResources()
  const { resources: assignedResources } = useGetUserResources(user.id)

  const button = {
    text: "Assign resources",
    onClick: () => {
      handleModal({
        title: 'Enrol user in resources',
        content: <EnrolUserInContent user={user} content={resources} assignedContent={assignedResources} typeName='resource' />
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
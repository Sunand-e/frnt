import BoxContainer from "../../common/containers/BoxContainer";
import {Library} from "@styled-icons/ionicons-solid/Library"
import { useContext } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from "../../../utils/router";
import UserPathwaysTable from "./UserPathwaysTable";
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser";
import useGetUserPathways from "../../../hooks/users/useGetUserPathways";
import EnrolUserInContent from "../content/EnrolUserInContent";
import { handleModal } from "../../../stores/modalStore";

const UserPathways = () => {
  
  const router = useRouter()
  const { id } = router.query
  const { user, loading, error } = useGetUser(id)

  const { pathways } = useGetCurrentUser()
  const { pathways: assignedPathways } = useGetUserPathways(user.id)

  const button = {
    text: "Assign pathways",
    onClick: () => {
      handleModal({
        title: 'Enrol user in pathways',
        content: <EnrolUserInContent user={user} content={pathways} assignedContent={assignedPathways} typeName='pathway' />
      })
    }
  }

  return (
    <BoxContainer title="Pathways" icon={Library} button={button}>
      <UserPathwaysTable />
    </BoxContainer>
  );
}

export default UserPathways
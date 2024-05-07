import BoxContainer from "../../common/containers/BoxContainer";
import {Library} from "@styled-icons/ionicons-solid/Library"
import { useContext } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from "../../../utils/router";
import UserPathwaysTable from "./UserPathwaysTable";
import useGetUserPathways from "../../../hooks/users/useGetUserPathways";
import EnrolUsersInContent from "../content/EnrolUsersInContent";
import { handleModal } from "../../../stores/modalStore";
import useGetPathways from "../../../hooks/pathways/useGetPathways";

const UserPathways = () => {
  
  const router = useRouter()
  const { id } = router.query
  const { user, loading, error } = useGetUser(id)

  const { pathways } = useGetPathways()
  const { pathways: assignedPathways } = useGetUserPathways(user.id)

  const button = {
    text: "Assign pathways",
    onClick: () => {
      handleModal({
        title: 'Enrol user in pathways',
        content: <EnrolUsersInContent user={user} content={pathways} assignedContent={assignedPathways} typeName='pathway' />
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
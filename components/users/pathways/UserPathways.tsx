import { Library } from "@styled-icons/ionicons-solid/Library";
import useGetUser from "../../../hooks/users/useGetUser";
import { handleModal } from "../../../stores/modalStore";
import { useRouter } from "../../../utils/router";
import BoxContainer from "../../common/containers/BoxContainer";
import EnrolUserInContent from "../content/EnrolUserInContent";
import UserPathwaysTable from "./UserPathwaysTable";

const UserPathways = () => {
  
  const router = useRouter()
  const { id } = router.query
  const { user, loading, error } = useGetUser(id)

  const button = {
    text: "Assign pathways",
    onClick: () => {
      handleModal({
        title: 'Enrol user in pathways',
        content: <EnrolUserInContent user={user} typeName='pathway' />
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
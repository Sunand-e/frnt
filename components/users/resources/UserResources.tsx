import BoxContainer from "../../common/containers/BoxContainer";
import {Library} from "@styled-icons/ionicons-solid/Library"
import { ModalContext } from "../../../context/modalContext";
import { useContext } from "react";
import useGetUser from "../../../hooks/users/useGetUser";
import { useRouter } from "../../../utils/router";
import UserResourcesTable from "./UserResourcesTable";

const UserResources = () => {
  
  const router = useRouter()
  const { id } = router.query
  const { user, loading, error } = useGetUser(id)
  const { handleModal } = useContext(ModalContext)

  const button = {
    text: "Assign items",
    onClick: () => {
    }
  }

  return (
    <BoxContainer title="Resources" icon={Library} button={button}>
      <UserResourcesTable />
    </BoxContainer>
    
  );
}

export default UserResources
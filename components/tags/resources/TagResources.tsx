import BoxContainer from "../../common/containers/BoxContainer";
import {Library} from "@styled-icons/ionicons-solid/Library"
import TagResourcesTable from "./TagResourcesTable";
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser";
import AddTagToContent from "../content/AddTagToContent";
import { handleModal } from "../../../stores/modalStore";

const TagResources = ({tag}) => {

  const { resources } = useGetCurrentUser()

  const button = {
    text: "Add resources",
    onClick: () => {
      handleModal({
        title: 'Add resources to category',
        content: <AddTagToContent tag={tag} content={resources} typeName='resource' />
      })
    }
  }

  return (
    <BoxContainer title="Resources" icon={Library} button={button}>
      <TagResourcesTable tag={tag} />
    </BoxContainer>    
  );
}

export default TagResources
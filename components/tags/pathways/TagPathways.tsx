import BoxContainer from "../../common/containers/BoxContainer";
import {Library} from "@styled-icons/ionicons-solid/Library"
import TagPathwaysTable from "./TagPathwaysTable";
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser";
import AddTagToContent from "../content/AddTagToContent";
import { handleModal } from "../../../stores/modalStore";

const TagPathways = ({tag}) => {

  const { pathways } = useGetCurrentUser()

  const button = {
    text: "Add pathways",
    onClick: () => {
      handleModal({
        title: 'Add pathways to category',
        content: <AddTagToContent tag={tag} content={pathways} typeName='pathway' />
      })
    }
  }

  return (
    <BoxContainer title="Pathways" icon={Library} button={button}>
      <TagPathwaysTable tag={tag} />
    </BoxContainer>
  );
}

export default TagPathways
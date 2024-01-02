import BoxContainer from "../../common/containers/BoxContainer";
import TagContentTable from "./TagContentTable";
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import AddTagToContent from "../content/AddTagToContent";
import { handleModal } from "../../../stores/modalStore";

const TagContent = ({tag, contentType, content}) => {
  
  const button = {
    text: `Add ${contentType.name}`,
    onClick: () => {
      handleModal({
        title: `Add ${contentType.plural} to category`,
        content: <AddTagToContent tag={tag} content={content} typeName={contentType.name} />
      })
    }
  }

  return (
    <BoxContainer title={`${contentType.label}s`} icon={GraduationCap} button={button}>
      <TagContentTable content={content} tag={tag} contentType={contentType} />
    </BoxContainer>
  );
}

export default TagContent
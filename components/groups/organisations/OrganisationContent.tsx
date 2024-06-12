import BoxContainer from "../../common/containers/BoxContainer";
import OrganisationContentTable from "./OrganisationContentTable";
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import { useRouter } from "../../../utils/router";
import useGetCourses from "../../../hooks/courses/useGetCourses";
import { handleModal } from "../../../stores/modalStore";
import useGetGroup from "../../../hooks/groups/useGetGroup";
import ProvideContentToGroup from "../../users/groups/ProvideContentToGroup";
import { contentTypes } from "../../common/contentTypes";

const OrganisationContent = ({typeName='course', content}) => {

  const type = contentTypes[typeName]
  
  const router = useRouter()
  const { id } = router.query

  const { group } = useGetGroup(id)

  const button = {
    text: `Provide ${type.plural}`,
    onClick: () => {
      handleModal({
        title: `Provide ${type.plural}`,
        content: <ProvideContentToGroup group={group} content={content} provisionedContent={group.provisionedContents} typeName={typeName} />
      })
    }
  }

  const boxTitle = type.plural.charAt(0).toUpperCase() + type.plural.slice(1);

  return (
    <BoxContainer title={boxTitle} icon={GraduationCap} button={button}>
      <OrganisationContentTable typeName={typeName} />
    </BoxContainer>
  );
}

export default OrganisationContent
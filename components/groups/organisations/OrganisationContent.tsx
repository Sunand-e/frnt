import { GraduationCap } from "@styled-icons/fa-solid/GraduationCap";
import useGetGroup from "../../../hooks/groups/useGetGroup";
import { handleModal } from "../../../stores/modalStore";
import { useRouter } from "../../../utils/router";
import BoxContainer from "../../common/containers/BoxContainer";
import { contentTypes } from "../../common/contentTypes";
import ProvideContentToGroup from "../../users/groups/ProvideContentToGroup";
import OrganisationContentTable from "./OrganisationContentTable";

const OrganisationContent = ({typeName='course'}) => {

  const type = contentTypes[typeName]
  
  const router = useRouter()
  const { id } = router.query

  const { group } = useGetGroup(id)
  const button = {
    text: `Provide ${type.plural}`,
    onClick: () => {
      handleModal({
        title: `Provide ${type.plural}`,
        content: (
          <ProvideContentToGroup
            group={group}
            provisionedContent={group.provisionedContents}
            contentTypeName={typeName}
          />
        )
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
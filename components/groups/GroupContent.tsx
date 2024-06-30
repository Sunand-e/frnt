import { GraduationCap } from "@styled-icons/fa-solid/GraduationCap";
import { type } from "cypress/types/jquery";
import useGetGroup from "../../hooks/groups/useGetGroup";
import { handleModal } from "../../stores/modalStore";
import { useRouter } from "../../utils/router";
import BoxContainer from "../common/containers/BoxContainer";
import { contentTypes } from "../common/contentTypes";
import AssociateContentWithGroup from "./AssociateContentWithGroup";
import GroupContentTable from "./GroupContentTable";

type AssociationType = 'assigned' | 'provided'

const GroupContent = ({typeName='course', groupType='group', associationType='assigned'}) => {

  const type = contentTypes[typeName]
  
  const router = useRouter()
  const { id } = router.query
  
  let actionNameCapitalised
  if(associationType === 'assigned') {
    actionNameCapitalised = 'Assign'
  } else if(associationType === 'provided') {
    actionNameCapitalised = 'Provide'
  }

  const { group } = useGetGroup(id)
  const button = {
    text: `${actionNameCapitalised} ${type?.plural}`,
    onClick: () => {
      handleModal({
        title: `${actionNameCapitalised} ${type?.plural}`,
        content: (
          <AssociateContentWithGroup
            group={group}
            associationType={associationType}
            contentType={typeName}
          />
        )
      })
    }
  }

  const boxTitle = type?.plural.charAt(0).toUpperCase() + type?.plural.slice(1);

  return (
    <BoxContainer title={boxTitle} icon={GraduationCap} button={button}>
      <GroupContentTable typeName={typeName} associationType={associationType} />
    </BoxContainer>
  );
}

export default GroupContent
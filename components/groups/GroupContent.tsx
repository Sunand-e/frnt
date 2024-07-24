import { GraduationCap } from "@styled-icons/fa-solid/GraduationCap";
import { type } from "cypress/types/jquery";
import useGetGroup from "../../hooks/groups/useGetGroup";
import { handleModal } from "../../stores/modalStore";
import { useRouter } from "../../utils/router";
import BoxContainer from "../common/containers/BoxContainer";
import { contentTypes } from "../common/contentTypes";
import GroupAvailableContentTable from "./GroupAvailableContentTable";
import GroupContentTable from "./GroupContentTable";

type AssociationType = 'assigned' | 'provided'

const GroupContent = ({typeName='content', groupType='group', associationType='assigned'}) => {

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
          <GroupAvailableContentTable
            group={group}
            associationType={associationType}
            contentType={typeName}
          />
        ),
        size: 'lg'
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
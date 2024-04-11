import BoxContainer from "../../common/containers/BoxContainer";
import OrganisationMembersTable from "./OrganisationMembersTable";
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import { useRouter } from "../../../utils/router";
import useGetCourses from "../../../hooks/courses/useGetCourses";
import { handleModal } from "../../../stores/modalStore";
import useGetGroup from "../../../hooks/groups/useGetGroup";
import ProvideContentToGroup from "../../users/groups/ProvideContentToGroup";
import AddUsersToGroup from "../../users/groups/AddUsersToGroup";

const OrganisationMembers = () => {

  const router = useRouter()
  const { id } = router.query
  
  const { courses } = useGetCourses()

  const { group } = useGetGroup(id)

  const button = {
    text: "Add members",
    onClick: () => {
      handleModal({
        title: 'Add members',
        content: <AddUsersToGroup group={group} />
      })
    }
  }

  return (
    <BoxContainer title="Members" icon={GraduationCap} button={button}>
      <OrganisationMembersTable />
    </BoxContainer>
  );
}

export default OrganisationMembers
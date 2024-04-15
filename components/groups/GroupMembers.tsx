import { GraduationCap } from "@styled-icons/fa-solid/GraduationCap";
import useGetCourses from "../../hooks/courses/useGetCourses";
import useGetGroup from "../../hooks/groups/useGetGroup";
import { handleModal } from "../../stores/modalStore";
import { useRouter } from "../../utils/router";
import BoxContainer from "../common/containers/BoxContainer";
import AddUsersToGroup from "./AddUsersToGroup";
import GroupMembersTable from "./GroupMembersTable";

const GroupMembers = ({
  maxVisibleRows=5,
  groupType="group",
  title="Members",
  addMembersButtonText="Add members",
  addMembersModalText="Add members",
  newMemberRole="Member",
  showRoles=[],
  isSingle=false
}) => {

  const router = useRouter()
  const { id } = router.query
  
  const { courses } = useGetCourses()

  const { group } = useGetGroup(id)

  const button = {
    text: addMembersButtonText,
    disabled: isSingle && group?.users.edges.length > 0,
    onClick: () => {
      handleModal({
        title: addMembersModalText,
        content: <AddUsersToGroup group={group} isSingle={isSingle} roleName={newMemberRole} />
      })
    }
  }

  return (
    <BoxContainer title={title} icon={GraduationCap} button={button}>
      <GroupMembersTable isSingle={isSingle} showRoles={showRoles} maxVisibleRows={maxVisibleRows} />
    </BoxContainer>
  );
}

export default GroupMembers
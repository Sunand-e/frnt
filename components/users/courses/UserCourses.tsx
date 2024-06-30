import BoxContainer from "../../common/containers/BoxContainer";
import UserCoursesTable from "./UserCoursesTable";
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import { useRouter } from "../../../utils/router";
import useGetUser from "../../../hooks/users/useGetUser";
import useGetCourses from "../../../hooks/courses/useGetCourses";
import useGetUserCourses from "../../../hooks/users/useGetUserCourses";
import EnrolUsersInContent from "../content/EnrolUsersInContent";
import { handleModal } from "../../../stores/modalStore";
import EnrolUserInContent from "../content/EnrolUserInContent";

const UserCourses = () => {

  const router = useRouter()
  const { id } = router.query
  const { user, loading, error } = useGetUser(id)

  const button = {
    text: "Assign courses",
    onClick: () => {
      handleModal({
        title: 'Enrol user in courses',
        content: <EnrolUserInContent user={user} typeName='course' />
      })
    }
  }

  return (
    <BoxContainer title="Courses" icon={GraduationCap} button={button}>
      <UserCoursesTable scrollInTable={true} />
    </BoxContainer>
  );
}

export default UserCourses
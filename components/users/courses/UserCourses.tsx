import BoxContainer from "../../common/containers/BoxContainer";
import UserCoursesTable from "./UserCoursesTable";
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import { useRouter } from "../../../utils/router";
import useGetUser from "../../../hooks/users/useGetUser";
import useGetCourses from "../../../hooks/courses/useGetCourses";
import useGetUserCourses from "../../../hooks/users/useGetUserCourses";
import EnrolUsersInContent from "../content/EnrolUsersInContent";
import { handleModal } from "../../../stores/modalStore";

const UserCourses = () => {

  const router = useRouter()
  const { id } = router.query
  const { user, loading, error } = useGetUser(id)

  const { courses } = useGetCourses()
  const { courses: assignedCourses } = useGetUserCourses(user.id)

  const button = {
    text: "Assign courses",
    onClick: () => {
      handleModal({
        title: 'Enrol user in courses',
        content: <EnrolUsersInContent users={[user]} content={courses} assignedContent={assignedCourses} typeName='course' />
      })
    }
  }

  return (
    <BoxContainer title="Courses" icon={GraduationCap} button={button}>
      <UserCoursesTable />
    </BoxContainer>
  );
}

export default UserCourses
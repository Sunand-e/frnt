import BoxContainer from "../../common/containers/BoxContainer";
import UserCoursesTable from "./UserCoursesTable";
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import { useContext } from "react";
import { ModalContext } from "../../../context/modalContext";
import { useRouter } from "../../../utils/router";
import useGetUser from "../../../hooks/users/useGetUser";
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser";
import useGetUserCourses from "../../../hooks/users/useGetUserCourses";
import EnrolUserInContent from "../content/EnrolUserInContent";

const UserCourses = () => {

  const router = useRouter()
  const { id } = router.query
  const { user, loading, error } = useGetUser(id)
  const { handleModal } = useContext(ModalContext)

  const { courses } = useGetCurrentUser()
  const { courses: assignedCourses } = useGetUserCourses(user.id)

  const button = {
    text: "Assign courses",
    onClick: () => {
      handleModal({
        title: 'Enrol user in courses',
        content: <EnrolUserInContent user={user} content={courses} assignedContent={assignedCourses} typeName='course' />
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
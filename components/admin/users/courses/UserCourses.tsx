import BoxContainer from "../../../common/containers/BoxContainer";
import UserCoursesTable from "./UserCoursesTable";
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import { useContext } from "react";
import { ModalContext } from "../../../../context/modalContext";
import EnrolUserInCourses from "../EnrolUserInCourses";
import { useRouter } from "../../../../utils/router";
import useGetUser from "../../../../hooks/users/useGetUser";

const UserCourses = () => {

  const router = useRouter()
  const { id } = router.query
  const { user, loading, error } = useGetUser(id)
  const { handleModal } = useContext(ModalContext)

  const button = {
    text: "Assign courses",
    onClick: () => {
      handleModal({
        title: 'Enrol user in courses',
        content: <EnrolUserInCourses user={user} />
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
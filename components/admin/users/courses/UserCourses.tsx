import BoxContainer from "../../../common/containers/BoxContainer";
import UserCoursesTable from "./UserCoursesTable";
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
const UserCourses = () => {

  const button = {
    text: "Assign courses",
    onClick: () => {
    }
  }

  return (
    <BoxContainer title="Courses" icon={GraduationCap} button={button}>
      <UserCoursesTable />
    </BoxContainer>
  );
}

export default UserCourses
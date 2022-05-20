import BoxContainer from "../../../common/containers/BoxContainer";
import UserCoursesTable from "./UserCoursesTable";

const UserCourses = () => {

  const button = {
    text: "Assign courses",
    onClick: () => {
    }
  }

  return (
    <BoxContainer title="Courses" button={button}>
      <UserCoursesTable />
    </BoxContainer>
  );
}

export default UserCourses
import BoxContainer from "../../../common/BoxContainer";

const UserCourses = () => {

  const button = {
    text: "Assign items",
    onClick: () => {
      alert('abc')
    }
  }

  return (
    <BoxContainer title="Courses" button={button}>
      <p>Courses list</p>
    </BoxContainer>
  );
}

export default UserCourses
import BoxContainer from "../../../common/containers/BoxContainer";

const UserResources = () => {
  
  const button = {
    text: "Assign items",
    onClick: () => {
    }
  }

  return (
    <BoxContainer title="Library Items" button={button}>
      <div className="bg-red-100">
        <p>Library items list</p>
      </div>
    </BoxContainer>
  );
}

export default UserResources
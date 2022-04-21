import BoxContainer from "../../../common/BoxContainer";

const UserLibraryItems = () => {
  
  const button = {
    text: "Assign items",
    onClick: () => {
      alert('abc')
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

export default UserLibraryItems
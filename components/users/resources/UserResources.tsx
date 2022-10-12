import BoxContainer from "../../common/containers/BoxContainer";
import {Library} from "@styled-icons/ionicons-solid/Library"

const UserResources = () => {
  
  const button = {
    text: "Assign items",
    onClick: () => {
    }
  }

  return (
    <BoxContainer title="Resources" icon={Library} button={button}>
      <div className="bg-red-100">
        <p>Resources list</p>
      </div>
    </BoxContainer>
  );
}

export default UserResources
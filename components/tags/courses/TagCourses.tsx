import BoxContainer from "../../common/containers/BoxContainer";
import TagCoursesTable from "./TagCoursesTable";
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import useGetCurrentUser from "../../../hooks/users/useGetCurrentUser";
import AddTagToContent from "../content/AddTagToContent";
import { handleModal } from "../../../stores/modalStore";

const TagCourses = ({tag, contentType}) => {

  const { courses } = useGetCurrentUser()
  
  const button = {
    text: "Add courses",
    onClick: () => {
      handleModal({
        title: 'Add courses to category',
        content: <AddTagToContent tag={tag} content={courses} typeName='course' />
      })
    }
  }

  return (
    <BoxContainer title="Courses" icon={GraduationCap} button={button}>
      <TagCoursesTable tag={tag} />
    </BoxContainer>
  );
}

export default TagCourses
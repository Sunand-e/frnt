import BoxContainer from "../../common/containers/BoxContainer";
import OrganisationCoursesTable from "./OrganisationCoursesTable";
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import { useRouter } from "../../../utils/router";
import useGetCourses from "../../../hooks/courses/useGetCourses";
import { handleModal } from "../../../stores/modalStore";
import useGetGroup from "../../../hooks/groups/useGetGroup";
import EnrolUserInContent from "../../users/content/EnrolUserInContent";
import ProvideContentToGroup from "../../users/groups/ProvideContentToGroup";

const OrganisationCourses = () => {

  const router = useRouter()
  const { id } = router.query
  
  const { courses } = useGetCourses()

  const { group } = useGetGroup(id)

  const button = {
    text: "Provide courses",
    onClick: () => {
      handleModal({
        title: 'Provide courses',
        content: <ProvideContentToGroup group={group} content={courses} providedContent={group.availableCourses} typeName='course' />
      })
    }
  }

  return (
    <BoxContainer title="Courses" icon={GraduationCap} button={button}>
      <OrganisationCoursesTable />
    </BoxContainer>
  );
}

export default OrganisationCourses
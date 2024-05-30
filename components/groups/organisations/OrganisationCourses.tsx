import BoxContainer from "../../common/containers/BoxContainer";
import OrganisationContentTable from "./OrganisationContentTable";
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import { useRouter } from "../../../utils/router";
import useGetCourses from "../../../hooks/courses/useGetCourses";
import { handleModal } from "../../../stores/modalStore";
import useGetGroup from "../../../hooks/groups/useGetGroup";
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
        content: <ProvideContentToGroup group={group} content={courses} provisionedContent={group.provisionedCourses} typeName='course' />
      })
    }
  }

  return (
    <BoxContainer title="Courses" icon={GraduationCap} button={button}>
      <OrganisationContentTable />
    </BoxContainer>
  );
}

export default OrganisationCourses
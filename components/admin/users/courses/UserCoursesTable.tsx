import { useContext, useMemo } from "react";
import { ModalContext } from "../../../../context/modalContext";
import BoxContainer from "../../../common/BoxContainer";
import { useRouter } from '../utils/router';

const UserCoursesTable = () => {
  
  const router = useRouter()

  const { id } = router.query

  const { loading, error, data: queryData } = useGetUs(id)

  const { handleModal } = useContext(ModalContext)
  
  const tableData = useMemo(() => queryData?.user.courses || [], [queryData]);

  return (
    <BoxContainer title="User Courses">
      <p>Courses list</p>
    </BoxContainer>
  );
}

export default UserCoursesTable
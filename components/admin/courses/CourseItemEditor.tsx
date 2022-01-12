import PageTitle from "../../PageTitle"
import { useEffect } from "react"
import { headerButtonsVar, viewVar } from "../../../graphql/cache"
import { useQuery } from "@apollo/client"
import { useRouter } from '../../../utils/router'
import { GET_LESSON } from "../../../graphql/queries/allQueries"
import Button from "../../Button"

import EditorLayout from "../../../layouts/EditorLayout"
import LessonEditor from "./LessonEditor"

const CourseItemEditor = ({id}) => {
  const router = useRouter()

  // const { id, cid } = router.query
  
  const { loading, error, data: {lesson} = {} } = useQuery(
    GET_LESSON,
    {
      variables: {
        id
      }
    }
  );
  // useEffect(() => {
  //   headerButtonsVar(
  //     <>
  //       <Button onClick={() => router.push(`/admin/courses/edit?id=${cid}`)}>Cancel</Button>
  //       <Button>Preview lesson</Button>
  //       <Button>Publish</Button>
  //     </>
  //   )
  // },[])

  return (
    <>
      { lesson && <LessonEditor id={id} /> }
    </>
  )
}
export default CourseItemEditor
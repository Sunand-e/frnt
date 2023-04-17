import useGetUserCourse from "../../../../hooks/users/useGetUserCourse";
import { useRouter } from "../../../../utils/router";
export const QuizModulePanel = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { quizzes } = useGetUserCourse(id)
  
  const module = quizzes?.edges.find(edge => (
    edge.node.id === contentId
  )).node

  return (
    <div>
      <pre>
      { JSON.stringify(module,null,2) }
      </pre>
      
    </div>
  )
}
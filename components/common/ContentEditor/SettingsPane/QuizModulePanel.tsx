import { useFragment_experimental } from "@apollo/client";
import { QuizFragment } from "../../../../graphql/queries/allQueries";
import { useRouter } from "../../../../utils/router";
import { useQuizStore } from "../../../quiz/useQuizStore";
export const QuizModulePanel = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query
  
  const { complete, data, missing } = useFragment_experimental({
    fragment: QuizFragment,
    fragmentName: 'QuizFragment',
    from: { id: contentId, __typename: "ContentItem", },
  });

  const questions = useQuizStore(state => state.questions)
  const activeQuestion = useQuizStore(state => state.activeQuestion)
  return (
    <div>dddddd
      <pre>
      {/* { JSON.stringify(data,null,2) } */}
      { JSON.stringify(questions,null,2) }
      <p>activeQuestion</p>
      { JSON.stringify(activeQuestion,null,2) }
      </pre>
      
    </div>
  )
}
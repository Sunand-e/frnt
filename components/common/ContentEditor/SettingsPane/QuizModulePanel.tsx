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
  const activeQuestion = useQuizStore(state => state.computed.activeQuestion())
  return (
    <div>
      {/* <pre>
      { JSON.stringify(activeQuestion,null,2) }
      </pre> */}
    </div>
  )
}
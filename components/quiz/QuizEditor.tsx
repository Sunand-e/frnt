import { useFragment_experimental } from '@apollo/client';
import { produce } from 'immer'
import { useEffect } from 'react';
import { client } from '../../graphql/client';
import { QuestionFragmentFragment } from '../../graphql/generated';
import { QuestionFragment, QuizFragment } from '../../graphql/queries/allQueries';
import useCreateQuestion from '../../hooks/questions/useCreateQuestion';
import useUpdateQuestion from '../../hooks/questions/useUpdateQuestion';
import useUpdateQuiz from '../../hooks/quizzes/useUpdateQuiz';
import { useRouter } from '../../utils/router';
import QuestionEditor from './questions/QuestionEditor';
import { useQuizStore } from './useQuizStore';

const QuizEditor = () => {

  const router = useRouter()
  const { cid: id, q } = router.query

  const { updateQuestion } = useUpdateQuestion()

  const { data: quiz } = useFragment_experimental({
    fragment: QuizFragment,
    fragmentName: 'QuizFragment',
    from: { id, __typename: "ContentItem" },
  });
  
  const { data: question, complete } = useFragment_experimental<QuestionFragmentFragment,any>({
    fragment: QuestionFragment,
    fragmentName: 'QuestionFragment',
    from: { id: q, __typename: "Question", },
  });

  useEffect(() => {
    useQuizStore.setState({activeQuestion: question})
  },[question])

  const handleUpdateQuestion = (question) => {
    console.log('question')
    console.log(question)
    updateQuestion(question)
  };

  return (
    q && complete ? (
      <div className='bg-main'>
        <QuestionEditor onUpdate={handleUpdateQuestion} question={question} type='simple' />
      </div>
    ) : (
        <div className={`w-full flex flex-col items-center mt-4`}>
          <div className="w-full max-w-screen-lg bg-main p-4 bg-opacity-10 border-2 border-dashed border-grey">
            <div className={`text-center text-main-secondary py-4`}>
              Select a question from the <b>Questions</b> panel.
            </div>
          </div>
        </div>
    )
  );
}

export default QuizEditor
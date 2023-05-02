import { useFragment_experimental } from "@apollo/client";
import { useEffect } from "react";
import { QuizFragment } from "../../graphql/queries/allQueries";
import { useRouter } from "../../utils/router";
import QuestionContainer from "./questions/QuestionContainer";
import { useQuizStore } from "./useQuizStore"

function QuizQuestionWrapper() {
  return (
    <div
      className="h-full w-full p-16"
    >
      <div className="p-12 bg-white rounded-lg shadow-md w-full flex justify-center">
        <div className="max-w-screen-lg w-full">
          { activeQuestion && <QuestionContainer question={activeQuestion} /> }
        </div>
      </div>
  </div>
  )
}

export default QuizQuestionWrapper
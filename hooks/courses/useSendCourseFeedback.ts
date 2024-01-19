import { useMutation } from "@apollo/client";
import { SEND_COURSE_FEEDBACK } from "../../graphql/mutations/course/SEND_COURSE_FEEDBACK";

function useSendCourseFeedback() {

  const [sendCourseFeedbackMutation, sendCourseFeedbackResponse] = useMutation<sendCourseFeedback, sendCourseFeedbackVariables>(SEND_COURSE_FEEDBACK)

  const sendCourseFeedback = (values) => {
    sendCourseFeedbackMutation({
      variables: values,
    })
  }
      
  return {
    sendCourseFeedback,
  }
}

export default useSendCourseFeedback
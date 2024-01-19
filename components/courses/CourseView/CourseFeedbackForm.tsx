import { useForm } from "react-hook-form";
import useSendCourseFeedback from "../../../hooks/courses/useSendCourseFeedback";
import { closeModal } from "../../../stores/modalStore";
import TextAreaInput from "../../common/inputs/TextAreaInput";
import { useRouter } from "../../../utils/router";
import Button from "../../common/Button";
import RadioButtonsInput from "../../common/inputs/RadioButtonsInput";
import { Label } from "recharts";
import TextInput from "../../common/inputs/TextInput";
import useGetUserCourse from "../../../hooks/users/useGetUserCourse";
import { toast } from "react-toastify";

const RadioButtonFeedbackQuestion = ({register, index, label, optionStrings, errors}) => {
  const options = optionStrings.map((string, idx) => ({ text: string, value: idx }))
  return (
    <RadioButtonsInput
      label={label}
      className="text-sm"
      inputAttrs={register(`radio${index}`, { required: "- Please select an option" })}
      horizontal={true}
      options={options}
      labelClassName={'font-bold'}
      error={errors[`radio${index}`] && errors[`radio${index}`]?.message}
    />
  )
}

const agreeArray = ['Agree', 'Agree in part', 'Disagree']

const radioInputs = [
  {
    label: "The course met my needs",
    options: agreeArray
  },
  {
    label: "Rate your overall experience of the course",
    options: ['Good', 'OK', 'Poor']
  },
  {
    label: "The course was easy to navigate" ,
    options: agreeArray
  },
  {
    label: "The information was pitched at the right level" ,
    options: ['Too low', 'Just right', 'Too high']
  },
  {
    label: "The topics covered were relevant to the course" ,
    options: agreeArray
  },
]

const CourseFeedbackForm = ({modal=false}) => {

  const router = useRouter()
  const { id } = router.query
  const { courseEdge } = useGetUserCourse(id)

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const { sendCourseFeedback } = useSendCourseFeedback()

  const onSubmit = async data => {
    const radioInputAnswers = radioInputs.map((input, index) => (
      ` - ${input.label}: ${input.options[data['radio'+index]] || '-'}`
    )).join('\n')
    const message = `Organisation: ${data.organisation || '-'}\n\n` + 
      `${radioInputAnswers}\n\n` +
      `Topics which need more coverage: ${data.additionalTopics || '-'}\n\n` +
      `Improvements: ${data.improvements || '-'}\n\n` +
      `Additional feedback: ${data.otherComments || '-'}`

    await sendCourseFeedback({
      courseId: id,
      message
    });
    closeModal()
    toast(`Thanks for your feedback!`, {
      toastId: 'courseFeedbackSent',
      hideProgressBar: true,
      autoClose: 3000
    })
    // reset();
  };
  const watchAllFields = watch(); 
  return (
    <>
      <p>Leaving feedback for course: <span className="font-bold">{courseEdge?.node.title}</span></p>
      <p className="my-3">Share your thoughts to enhance your learning experience! Your input helps us tailor this course to meet your needs and create a better learning environment for you.</p>
      <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={`h-full w-full flex flex-col space-y-4`}
      >
        <TextInput
          className="w-full"
          label="Organisation"
          labelClassName="font-bold"
          placeholder="Organisation name"
          inputAttrs={register("organisation")}
        />
        { radioInputs.map((input, index) => (
          <RadioButtonFeedbackQuestion
            register={register}
            index={index}
            label={input.label}
            optionStrings={input.options}
            errors={errors}
          />
        ))}
        <TextAreaInput
          className="w-full"
          labelClassName="font-bold"
          label="Are there any topic(s) you would have liked additional content for?"
          placeholder="List topics the topics which you think need more coverage"
          inputAttrs={register("additionalTopics")}
        />
        <TextAreaInput
          className="w-full"
          labelClassName="font-bold"
          label="What could have improved the course for you?"
          placeholder="Tell us how we can improve"
          inputAttrs={register("improvements")}
        />
        <TextAreaInput
          className="w-full"
          labelClassName="font-bold"
          label="Any other comments?"
          placeholder="Additional feedback"
          inputAttrs={register("otherComments")}
        />
        <Button type="submit" className="flex-none">SUBMIT</Button>
      </form>
    </>
  );
}

export default CourseFeedbackForm
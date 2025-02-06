import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Button from "../common/Button"
import FileDropzone from "../common/FileDropzone"
import TextInput from "../common/inputs/TextInput"

interface AICreateQuizFormValues {
  course_id: String
  content: String
  openai_key: String
  quiz_title: String
  amount: Number
}

export const AICreateQuizForm = ({onResponse}) => {
  
  const endpoint = '/api/v1/generate_quiz_questions'

  const defaultValues = {
    // course_id: id,
    content: '',
    // quiz_title: 'Assessment',
    amount: 2
  }
  const { register, handleSubmit: rhfHandleSubmit, control, setValue, formState: { errors } } = useForm<AICreateQuizFormValues>({defaultValues});

  const [filename, setFilename] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<string>>([]);

  const handleSubmit = async (formData) => {
    setError(null)
    setMessages([])
    try {
      formData.openai_key = localStorage.getItem('openai_key')
      const response = await fetch(endpoint, {
        method: 'POST', // or 'PUT' if it's an update
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        console.log('response.ok is false')
        throw new Error('Failed to create quiz');
      }


      // Parse the response as JSON
      const data = await response.json();
      console.log('handleSubmitResponse (data)')
      console.log(data)

      onResponse(data)
      toast(`JSON question data received.`, {
        toastId: 'aiQuestionsReceived',
        hideProgressBar: true,
        autoClose: 2500
      })
      
      // If the request was successful, you can handle the response here
      // For example, you can reset the form or navigate to a different page

    } catch (error) {
      setError(error.message);
      setMessages(messages => [
        ...messages,
        error.message
      ]);
    }
  }

  const handleDropContentFile = async ([file]) => {
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result as String;
      // const json = JSON.parse(contents as string)
      setValue('content', contents)
    };
    reader.readAsText(file);
    setFilename(file.name)
  }
  
  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)}>
      <span className="text-sm font-medium text-secondary">Create Quiz</span>
      <FileDropzone
        dropZoneContent={filename || 'Drop the questions text file here'}
        accept={{
          'text/plain': ['.txt']
        }}
        onDrop={handleDropContentFile}
      />
      {/* <TextInput
      label="Course ID"
        inputAttrs={{
          ...register("course_id", {
            required:"Course id is required"
          }),
        }}
      /> */}
      {/* <TextInput
        inputAttrs={{
          ...register("quiz_title"),
        }}
        label="Quiz title"
      /> */}
      <TextInput
      label="No. of questions"
        inputAttrs={{
          ...register("amount", {
            required:"Number of questions is required"
          }),
        }}
      />
      <Button type="submit">Submit</Button>
      { error && <p className="text-red-500 font-bold">{error}</p> }
      <ul>
        { messages.map((message, index) => (
          <span key={index} className="text-green-500 font-bold">{message}</span> 
        ))}
      </ul>
    </form>
  )  
}
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import useCourse from "../../../../hooks/courses/useCourse";
import { useLessonContentFragment } from "../../../../hooks/lessons/useLessonContentFragment";
import useUpdateLesson from "../../../../hooks/lessons/useUpdateLesson";
import useGetUserCourse from "../../../../hooks/users/useGetUserCourse";
import { closeModal, handleModal } from "../../../../stores/modalStore";
import { useRouter } from "../../../../utils/router";
import CourseForm from "../../../courses/CourseForm";
import { lessonTypes } from "../../../courses/lessonTypes";
import PackageLibrary from "../../../packages/PackageLibrary";
import TextInput from "../../inputs/TextInput";

import { useForm } from 'react-hook-form';

interface LessonFormValues {
  title: string
}
export const LessonModulePanel = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { lessons } = useGetUserCourse(id)
  
  
  const module = lessons?.edges.find(edge => (
    edge.node.id === contentId
  )).node
  
  const defaultValues = {
    ...module
  }
  
  const { register, watch, control, setFocus, getValues, setValue, formState: { errors } } = useForm<LessonFormValues>({defaultValues});

  const { updateLesson } = useUpdateLesson()
  
  const handleChangeValue = () => {
    console.log('lesson')
  }
  

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className={'flex flex-col items-center space-y-4'}
    >
      <TextInput 
        inputAttrs={register("title", {
          required:"Course name is required"
        })}
      />      
    </form>
  )
}
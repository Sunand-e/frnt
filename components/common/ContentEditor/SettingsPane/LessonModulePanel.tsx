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
import { moduleTypes } from "../../../courses/moduleTypes";
import PackageLibrary from "../../../packages/PackageLibrary";
import TextInput from "../../inputs/TextInput";

import { useForm } from 'react-hook-form';
import { gql, useFragment_experimental } from "@apollo/client";
import { LessonFragment } from "../../../../graphql/queries/allQueries";

interface LessonFormValues {
  title: string
}
export const LessonModulePanel = () => {

  const router = useRouter()
  const { cid: contentId } = router.query

  const { complete, data, missing } = useFragment_experimental({
    fragment: LessonFragment,
    fragmentName: 'LessonFragment',
    from: { id: contentId, __typename: "ContentItem", },
  });
  
  const defaultValues = {
    ...data
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
          required:"Lesson name is required"
        })}
      />      
    </form>
  )
}
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
import { useBlockStore } from "../useBlockStore";

interface LessonFormValues {
  title: string
}
export const BlockPanel = () => {

  const blocks = useBlockStore(state => state.blocks)
  const activeDragItem = useBlockStore(state => state.activeDragItem)
  const setBlocks = useBlockStore(state => state.setBlocks)
  const insertBlock = useBlockStore(state => state.insertBlock)
  const blockIds = useBlockStore(state => state.blocks.map(block => block.id))

  return (

<pre>
{ JSON.stringify(blockIds,null,2) }
{ JSON.stringify(blocks,null,2) }
</pre>
      
  )
}
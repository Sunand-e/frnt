import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import { ScormModule } from "../../../../graphql/generated";
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
import useBlockEditor from "../useBlockEditor";
import { useBlockStore } from "../useBlockStore";

import { useForm } from 'react-hook-form';
import useGetScormModules from "../../../../hooks/scormModules/useGetMediaItems";

export const ScormModulePanel = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query
  const { lessons } = useGetUserCourse(id)
  
  const module = lessons?.edges.find(edge => (
    edge.node.id === contentId
  )).node

  const { blocks } = useBlockStore()
  const { updateBlock } = useBlockEditor()
  
  const scormPackageBlock = blocks.find(
    block => block.type === 'package'
  )
  
  const defaultValues = {
    filename: scormPackageBlock?.properties?.title
  }

  const { register, watch, control, setFocus, getValues, setValue, formState: { errors } } = useForm({defaultValues});

  const handlePackageSelect = (_package: ScormModule) => {
    updateBlock({
      ...scormPackageBlock,
      properties: {
        ...scormPackageBlock?.properties,        
        url: _package.launchUrl,
        moduleId: _package.id
      }
    })
    setValue('filename', _package.title)
    closeModal()
  }
  
  const handleInputClick = () => {
    handleModal({
      title: `Choose package`,
      content: <PackageLibrary onItemSelect={handlePackageSelect} />,
      size: 'lg'
    })
  }

  return (
    <div>
      <TextInput 
        inputAttrs={register("filename", {
          required:"Course name is required"
        })}
      onClick={handleInputClick} />
      
    </div>
  )
}
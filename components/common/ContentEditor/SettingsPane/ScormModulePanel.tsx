import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import { ScormPackage } from "../../../../graphql/generated";
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
import useBlockEditor from "../useBlockEditor";
import { useBlockStore } from "../useBlockStore";

import { useForm } from 'react-hook-form';
import useGetScormPackages from "../../../../hooks/scormPackages/useGetScormPackages";
import { useFragment_experimental } from "@apollo/client";
import { LessonFragment } from "../../../../graphql/queries/allQueries";

export const ScormModulePanel = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query
  
  const { complete, data, missing } = useFragment_experimental({
    fragment: LessonFragment,
    fragmentName: 'LessonFragment',
    from: { id: contentId, __typename: "ContentItem", },
  });

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
        inputAttrs={register("filename")}
        onClick={handleInputClick}
      />    
    </div>
  )
}
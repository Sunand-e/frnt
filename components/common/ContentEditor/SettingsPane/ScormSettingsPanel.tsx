import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import { ScormPackage } from "../../../../graphql/generated";
import useUpdateCourse from "../../../../hooks/courses/useUpdateCourse";
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
import { Box } from "@styled-icons/boxicons-regular/Box";

export const ScormSettingsPanel = () => {

  const { blocks } = useBlockStore()
  const { updateBlock } = useBlockEditor()

  const scormPackageBlock = blocks.find(
    block => block.type === 'package'
  )
  
  const handlePackageSelect = (scormPackage: ScormPackage) => {
    updateBlock({
      ...scormPackageBlock,
      properties: {
        ...scormPackageBlock?.properties,        
        url: scormPackage.launchUrl,
        moduleId: scormPackage.id,
        title: scormPackage.title
      }
    })
    // setValue('filename', _package.title)
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
      <span className="text-sm font-medium text-secondary">SCORM zip file</span>
      <div className="flex items-star space-x-2">
        <Box className="w-8 text-main" />
      <div className="">
          <p className="text-sm font-medium text-main-secondary truncate">
            { scormPackageBlock?.properties?.title }
          </p>
          <p 
            className="text-sm text-main hover:font-bold cursor-pointer"
            onClick={handleInputClick}
          >Change package</p>
        </div>
      </div>
    </div>
  )
}
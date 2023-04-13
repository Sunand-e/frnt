import { height } from "@fortawesome/free-solid-svg-icons/faCalendarDays";
import { CodeCurlyDimensions } from "@styled-icons/boxicons-regular/CodeCurly";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import useCourse from "../../../../hooks/courses/useCourse";
import { useLessonContentFragment } from "../../../../hooks/lessons/useLessonContentFragment";
import useGetUserCourse from "../../../../hooks/users/useGetUserCourse";
import { useRouter } from "../../../../utils/router";
import CourseForm from "../../../courses/CourseForm";
import { lessonTypes } from "../../../courses/lessonTypes";
import { useBlockStore } from "../useBlockStore";
import { useEditorViewStore } from "../useEditorViewStore";
import { BlockPanel } from "./BlockPanel";
import { LessonModulePanel } from "./LessonModulePanel";
import { QuizModulePanel } from "./QuizModulePanel";
import { ScormModulePanel } from "./ScormModulePanel";

export const SettingsPane = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query

  const { complete, data: module } = useLessonContentFragment(contentId)
  const moduleTypeName = module.itemType === 'quiz' ? 'quiz' : module.contentType
  const moduleType = lessonTypes[moduleTypeName]
  const modulePanelTitle = `${moduleType?.shortName || moduleType?.label} settings`

  const activePanel = useEditorViewStore(state => state.activeSettingsPanel)
  const activeBlockId = useBlockStore(state => state.activeBlockId)
  
  const { courses } = useGetUserCourse(id)
  const course = courses?.edges[0]?.node
  const { updateCourse } = useCourse(id)

  const handleClick = (panel) => {
    const newActivePanel = (panel.name === activePanel) ? null : panel.name
    useEditorViewStore.setState({activeSettingsPanel: newActivePanel})
  }

  const onCourseSettingsSubmit = async ({content, ...values}) => {

    await updateCourse({
      content: { description: content }, 
      ...values
    })

    toast('Course settings saved.', {
      toastId: 'courseSettingsSaved',
      hideProgressBar: true,
      autoClose: 2500
    })
  }

  const ModulePanel = () => {
    if(moduleTypeName === 'scorm_assessment') {
      return <ScormModulePanel />
    } else if(moduleTypeName === 'quiz') {
      return <QuizModulePanel />
    } else {
      return <LessonModulePanel />
    }
  }

  const panels = [
    {
      name: 'course',
      title: "Course settings",
      content: (
        <CourseForm 
          course={course} 
          isModal={true}
          onSubmit={onCourseSettingsSubmit}
          submitButtonText="Save settings"
        />
      )
    },
    ...( !!moduleType && [{
      name: 'module',
      title: modulePanelTitle,
      content: <ModulePanel />
    }] || []),
    ...( !!activeBlockId && [{
      name: 'block',
      title: "Block settings",
      content: <BlockPanel />
    }] || [])
  ]
  
  return (
    <div className="flex-none w-[300px] fixed right-0 h-[calc(100vh-108px)] bg-main/10 shadow-md px-3 flex flex-col">
      { panels.map((panel, index) => {
        const isActive = (panel.name === activePanel)

        return (
          <Fragment key={index}>
            <div
              className="border-b border-gray-300 py-4 px-1 flex-0 "
              onClick={() => handleClick(panel)}
            >
              <h3 className="text-base font-medium leading-6 text-main-secondary">{ panel.title }</h3>
            </div>

            <AnimatePresence>
              { isActive && (
                <motion.div
                  transition={{
                    duration: 0.4,
                  }}
                  layout
                  style={{
                    overflowY: 'auto',
                    overflowX: 'auto',
                    minHeight: 0
                    // ...containerStyles
                  }}
                  initial={'closed'}
                  exit={'closed'}
                  animate={'open'}
                  variants={{
                    closed: { 
                      flexGrow: 0, 
                      padding: 0,
                      height:0,
                    },
                    open: { 
                      height: '200px',
                      flexGrow: 1,
                    }
                  }}
                >
                  { panel.content }
                </motion.div>
              )}
            </AnimatePresence>
          </Fragment>
        )
      })}
    </div>
  )
}
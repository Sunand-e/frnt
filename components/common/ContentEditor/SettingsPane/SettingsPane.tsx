import { height } from "@fortawesome/free-solid-svg-icons/faCalendarDays";
import { CodeCurlyDimensions } from "@styled-icons/boxicons-regular/CodeCurly";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useUpdateCourse from "../../../../hooks/courses/useUpdateCourse";
import { useLessonContentFragment } from "../../../../hooks/lessons/useLessonContentFragment";
import useGetUserCourse from "../../../../hooks/users/useGetUserCourse";
import { useRouter } from "../../../../utils/router";
import CourseForm from "../../../courses/CourseForm";
import CourseSettings from "../../../courses/CourseSettings";
import { moduleTypes } from "../../../courses/moduleTypes";
import QuestionSettings from "../../../quiz/questions/QuestionSettings";
import { useQuizStore } from "../../../quiz/useQuizStore";
import blocktypes from "../blocktypes";
import { getIndexAndParent, useBlockStore } from "../useBlockStore";
import { useEditorViewStore } from "../useEditorViewStore";
import { BlockSettingsPanel } from "./BlockSettingsPanel";
import { LessonSettingsPanel } from "./LessonSettingsPanel";
import { QuizSettingsPanel } from "./QuizSettingsPanel";
import { ScormSettingsPanel } from "./ScormSettingsPanel";

export const SettingsPane = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query

  const { complete, data: module } = useLessonContentFragment(contentId)
  const moduleTypeName = module.itemType === 'quiz' ? 'quiz' : module.contentType
  const moduleType = moduleTypes[moduleTypeName]
  const modulePanelTitle = `${moduleType?.shortName || moduleType?.label} settings`

  const activePanel = useEditorViewStore(state => state.activeSettingsPanel)

  const activeBlock = useBlockStore(state => state.computed.activeBlock())
  const activeQuestion = useQuizStore(state => state.computed.activeQuestion())
  
  const { updateCourse } = useUpdateCourse(id)

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
      return <ScormSettingsPanel />
    } else if(moduleTypeName === 'quiz') {
      return <QuizSettingsPanel />
    } else {
      return <LessonSettingsPanel />
    }
  }

  const panels = useMemo(() => {
    let blockname
    if(activeBlock) {
      blockname = blocktypes[activeBlock.type].text + ' block'
      const { parent } = getIndexAndParent(activeBlock.id)
      if(parent) {
        switch(parent.type) {
          case 'tabs':
            blockname = 'Tab item'
            break;
          case 'carousel':
            blockname = 'Carousel item'
            break;
          case 'accordion':
            blockname = 'Accordion item'
            break;
        }
      }
    }

    return [
      {
        name: 'course',
        title: "Course settings",
        content: <CourseSettings />
      },
      ...( !!moduleType && [{
        name: 'module',
        title: modulePanelTitle,
        content: <ModulePanel key={contentId} />
      }] || []),
      ...( !!activeBlock && [{
        name: 'block',
        title: `${blockname} settings`,
        content: <BlockSettingsPanel key={activeBlock.id} />
      }] || []),
      ...( moduleTypeName === 'quiz' && activeQuestion && [{
      // ...( activeQuestion && [{
        name: 'question',
        title: "Question settings",
        // content: <>{moduleTypeName}</>
        content: <QuestionSettings key={activeQuestion.id} idd={activeQuestion.id} />
      }] || [])
    ]
  },[moduleType,activeBlock, activeQuestion?.id, contentId])
  
  return (
    <div className="flex-none w-[300px] fixed right-0 overflow-auto h-[calc(100vh-108px)] bg-main/10 shadow-md px-3 flex flex-col">
      {/* {activeQuestion.id} */}
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
                className="mt-2"
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
import { height } from "@fortawesome/free-solid-svg-icons/faCalendarDays";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import useCourse from "../../../../hooks/courses/useCourse";
import { useLessonContentFragment } from "../../../../hooks/lessons/useLessonContentFragment";
import useGetUserCourse from "../../../../hooks/users/useGetUserCourse";
import { useRouter } from "../../../../utils/router";
import CourseForm from "../../../courses/CourseForm";
import { lessonTypes } from "../../../courses/lessonTypes";
import { LessonModulePanel } from "./LessonModulePanel";
import { ScormModulePanel } from "./ScormModulePanel";

export const SettingsPane = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query

  const { complete, data: module } = useLessonContentFragment(contentId)
  const moduleType = lessonTypes[module.contentType]
  const modulePanelTitle = `${moduleType?.shortName || moduleType?.label} settings`

  const [activePanelIndex, setActivePanelIndex] = useState(0)

  const { courses } = useGetUserCourse(id)
  const course = courses?.edges[0]?.node
  const { updateCourse } = useCourse(id)

  const handleClick = (index) => {
    const activeIndex = (index === activePanelIndex) ? null : index
    setActivePanelIndex(activeIndex)
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

  const ModulePanel = module.contentType === 'scorm_assessment' ? (
    ScormModulePanel
    ) : (
    LessonModulePanel
  )

  const panels = [
    {
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
      title: modulePanelTitle,
      content: <ModulePanel />
    }] || [])
  ]

  return (
    <div className="flex-none w-[300px] fixed right-0 h-[calc(100vh-108px)] bg-main/10 shadow-md px-3 flex flex-col">
      { panels.map((panel, index) => {
        const isActive = (index === activePanelIndex)

        return (
          <Fragment key={index}>
            <div
              className="border-b border-gray-300 py-4 px-1 flex-0 "
              onClick={() => handleClick(index)}
            >
              <h3 className="text-base font-medium leading-6 text-main-secondary">{ panel.title }</h3>
            </div>

            <AnimatePresence>
              { isActive && (
                <motion.div
                  transition={{
                    duration: 0.6,
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
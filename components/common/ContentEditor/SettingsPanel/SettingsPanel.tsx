import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import useCourse from "../../../../hooks/courses/useCourse";
import { useLessonContentFragment } from "../../../../hooks/lessons/useLessonContentFragment";
import useGetUserCourse from "../../../../hooks/users/useGetUserCourse";
import { useRouter } from "../../../../utils/router";
import CourseForm from "../../../courses/CourseForm";
import { lessonTypes } from "../../../courses/lessonTypes";

export const SettingsPanel = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query

  const { complete, data } = useLessonContentFragment(contentId)
  const lessonType = lessonTypes[data.contentType]
  const lessonSettingsTitle = `${lessonType?.shortName || lessonType?.label} settings`

  const [activePanelIndex, setActivePanelIndex] = useState(0)

  const { courses } = useGetUserCourse(id)
  const course = courses?.edges[0]?.node
  const { updateCourse } = useCourse(id)



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
    ...( !!lessonType && [{
      title: lessonSettingsTitle,
      content: <></>
    }] || [])
  ]

  return (
    <div className="flex-none w-[300px] fixed right-0 h-full bg-main/10 shadow-md px-3">
      { panels.map((panel, index) => {
        const isActive = (index === activePanelIndex)
        return (
          <div>
            <div
              className="border-b border-gray-300 py-4 px-1"
              onClick={() => setActivePanelIndex(index)}
            >
              <h3 className="text-base font-medium leading-6 text-main-secondary">{ panel.title }</h3>
            </div>
            {/* <AnimatePresence>
            { isActive && ( */}
              <motion.div
                className="border-b border-gray-300 py-4 px-1"
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
              >
                { panel.content }
              </motion.div>
            {/* )} */}
            {/* </AnimatePresence> */}
          </div>
        )
      })}
    </div>
  )
}
import BlockSelector from "../BlockSelector";
import CourseStructureEditor from "../../../courses/CourseStructureEditor/CourseStructureEditor";
import SidebarEditableItem from "../../../courses/CourseStructureEditor/SidebarEditableItem";
import QuizStructureEditor from "../../../quiz/QuizStructureEditor/QuizStructureEditor";
import { SidebarCoursePageItem } from "../../../courses/SidebarCoursePageItem";

export const sidebarBlockButtonClassName = `
  aspect-square flex flex-col justify-center items-center 
  space-y-2 p-2 text-center
  bg-white rounded-lg
  shadow shadow-lg
  hover:shadow-xl
  hover:scale-[1.1]
  focus:scale-[1.1]
`

export const sidebarPanels = [
  {
    name: "structure",
    label: "Course Structure",
    component: (
      <CourseStructureEditor
        renderItem={SidebarEditableItem}
      />
    )
  },
  {
    name: "blocks",
    label: "Blocks",
    component: <BlockSelector
      className="text-main-secondary gap-3 p-3  align-center items-center grid sm:grid-cols-2 text-sm" 
      blockButtonClassName={sidebarBlockButtonClassName}
    />
  },
  {
    name: "questions",
    label: "Questions",
    height: '100%',
    component: <QuizStructureEditor />
  },
]
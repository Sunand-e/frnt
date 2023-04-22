import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useCreateLesson from "../../hooks/lessons/useCreateLesson";
import useCreateQuiz from "../../hooks/quizzes/useCreateQuiz";
import { closeModal, handleModal } from "../../stores/modalStore";
import { useRouter } from "../../utils/router";
import PackageLibrary from "../packages/PackageLibrary";
import { moduleTypes } from "./moduleTypes";
import NewCourseItem from "./NewCourseItem";

const NewCourseItemList = ({
  sectionId, 
  onSelect = () => null
}) => {

  const router = useRouter()

  const navigateToItem = (id) => {
    router.push({query: {
      ...router.query,
      cid: id
    }})
  }
  const { createLesson, lesson } = useCreateLesson(sectionId)
  const { createQuiz, quiz } = useCreateQuiz(sectionId)

  const handlePackageSelect = async (scormModule) => {
    const newLesson = await createLesson({
      contentType: 'scorm_assessment',
      content: {
        blocks: [
          {
            type: 'package',
            id: uuidv4(),
            properties: {
              url: scormModule.launchUrl,
              moduleId: scormModule.id
            }
          }
        ],
      },
    })
    navigateToItem(newLesson.data.createLesson.lesson.id)
    closeModal()
  }
  
  const handleItemClick = async (moduleType) => {
    if(moduleType === 'scorm_assessment') {
      handleModal({
        title: `Choose package`,
        content: <PackageLibrary onItemSelect={handlePackageSelect} />,
        size: 'lg'
      })
    } else if(moduleType === 'quiz') {
      const newQuiz = await createQuiz({
        content: moduleTypes[moduleType].defaultContent || {blocks:[]},
      })
      navigateToItem(newQuiz.data.createQuiz.quiz.id)
    } else {
      const newLesson = await createLesson({
        content: moduleTypes[moduleType].defaultContent || {blocks:[]}, 
        contentType: moduleType
      })
      navigateToItem(newLesson.data.createLesson.lesson.id)
    }
    onSelect()
  }
  
  const items = Object.keys(moduleTypes).map(key => {
    return <NewCourseItem key={key} onClick={() => handleItemClick(key)} label={moduleTypes[key].label} IconComponent={moduleTypes[key].icon} />
  })

  return (
    <div>
      <p className="-mx-2 -mt-2 mb-1 p-3 bg-main/10 text-main-secondary font-semibold">Choose a module type...</p>
      {items}
    </div>
  )
}

export default NewCourseItemList

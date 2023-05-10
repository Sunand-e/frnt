import { useRouter } from "next/router";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import useCreateLesson from "../../hooks/lessons/useCreateLesson";
import useUpdateLesson from "../../hooks/lessons/useUpdateLesson";
import useCreateQuiz from "../../hooks/quizzes/useCreateQuiz";
import { closeModal, handleModal } from "../../stores/modalStore";
import IconOption from "../common/inputs/react-select/IconOption";
import PackageLibrary from "../packages/PackageLibrary";
import { moduleTypes } from "./moduleTypes";

const moduleTypesArray = Object.keys(moduleTypes).map(key => {
  return {
    ...moduleTypes[key],
    value: key
  }
});

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    padding: 8,
  }),
}

const SelectNewCourseItem = ({
  sectionId, 
  placeholder="Choose a module type...",
}) => {

  const router = useRouter()
  const { createLesson, lesson } = useCreateLesson(sectionId)
  const { createQuiz, quiz } = useCreateQuiz(sectionId)

  const navigateToItem = (id) => {
    router.push({query: {
      ...router.query,
      cid: id
    }})
  }

  const handlePackageSelect = async (scormPackage) => {
    const newLesson = await createLesson({
      contentType: 'scorm_assessment',
      content: {
        blocks: [
          {
            type: 'package',
            id: uuidv4(),
            properties: {
              url: scormPackage.launchUrl,
              moduleId: scormPackage.id
            }
          }
        ],
      },
    })
    navigateToItem(newLesson.data.createLesson.lesson.id)
    closeModal()
  }

  const handleNewModule = async ({value}) => {

    if(value === 'quiz') { 
      const newModule = await createQuiz({})
      navigateToItem(newModule.data.createQuiz.quiz.id)
    } else if(value === 'scorm_assessment') { 
      handleModal({
        title: `Choose package`,
        content: <PackageLibrary onItemSelect={handlePackageSelect} />,
        size: 'lg'
      })
    } else {
      const newModule = await createLesson({contentType: value})
      navigateToItem(newModule.data.createLesson.lesson.id)
    }
  }

  return (
    <Select
      placeholder={<span className="text-main-secondary">{placeholder}</span>}
      options={moduleTypesArray}
      styles={customStyles}
      components={{ Option: IconOption }}
      onChange={handleNewModule}
      value={null}
      className={`w-full`}
      isSearchable={false} 
      closeMenuOnSelect={true}
    />
  )
}

export default SelectNewCourseItem

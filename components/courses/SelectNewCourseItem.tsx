import { useRouter } from "next/router";
import Select from "react-select";
import useCreateLesson from "../../hooks/lessons/useCreateLesson";
import useUpdateLesson from "../../hooks/lessons/useUpdateLesson";
import useCreateQuiz from "../../hooks/quizzes/useCreateQuiz";
import IconOption from "../common/inputs/react-select/IconOption";
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
  const handleNewModule = async ({value}) => {

    if(value === 'quiz') { 
      const newModule = await createQuiz({})
      navigateToItem(newModule.data.createQuiz.quiz.id)
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

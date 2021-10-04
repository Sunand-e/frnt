import { useMutation } from "@apollo/client";
import { CreateLesson } from "../../../graphql/mutations/lesson/__generated__/CreateLesson";
import { CREATE_LESSON } from "../../../graphql/mutations/lesson/CREATE_LESSON";
import { CreateLessonVariables } from "../../../graphql/mutations/lesson/__generated__/CreateLesson";
import { v4 as uuidv4 } from 'uuid';
import { GetSection, GetSection_section } from "../../../graphql/queries/__generated__/GetSection";
import { GET_COURSE, GET_SECTION, SectionFragment } from "../../../graphql/queries/allQueries";
import AddLessonModalForm from "./AddLessonModalForm";
import { useContext } from "react";
import { ModalContext } from "../../../context/modalContext";

const AddItemToCourseModal = ({sectionId}) => {
  
  const { handleModal } = useContext(ModalContext);
  
  const handleNewLessonButton = () => {
    handleModal({
      title: `Lesson name:`,
      content: <AddLessonModalForm sectionId={sectionId} />
    })
  }

  return (
    <div className="flex flex-col space-y-2 mt-5 sm:mt-6">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm"
        onClick={handleNewLessonButton}
      >
        New Lesson
      </button>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm"
        // onClick={() => createCourse()}
      >
        New Quiz
      </button>
    </div>
  )
}

export default AddItemToCourseModal
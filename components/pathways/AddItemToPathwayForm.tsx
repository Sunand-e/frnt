import { useMutation } from "@apollo/client";
import { CreateLesson } from "../../../graphql/mutations/lesson/__generated__/CreateLesson";
import { CREATE_LESSON } from "../../../graphql/mutations/lesson/CREATE_LESSON";
import { CreateLessonVariables } from "../../../graphql/mutations/lesson/__generated__/CreateLesson";
import { v4 as uuidv4 } from 'uuid';
import { GetSection, GetSection_section } from "../../../graphql/queries/__generated__/GetSection";
import { GET_COURSE, GET_SECTION, SectionFragment } from "../../../graphql/queries/allQueries";
import AddLessonModal from "./AddLessonModal";
import { useContext } from "react";
import { handleModal } from "../../stores/modalStore";

const AddItemToCourseForm = ({sectionId}) => {
  
  const handleNewLessonButton = () => {
    handleModal({
      title: `Lesson name:`,
      content: <AddLessonModal sectionId={sectionId} />
    })
  }

  return (
    <div className="flex flex-col space-y-2 mt-5 sm:mt-6 w-full">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm"
        onClick={handleNewLessonButton}
      >
        Video
      </button>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm"
        onClick={handleNewLessonButton}
      >
        text
      </button>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm"
        onClick={handleNewLessonButton}
      >
        Image
      </button>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm"
        onClick={handleNewLessonButton}
      >
        Document
      </button>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm"
        onClick={handleNewLessonButton}
      >
        SCORM
      </button>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm"
        onClick={handleNewLessonButton}
      >
        Assignment
      </button>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm"
        onClick={handleNewLessonButton}
      >
        Freeform
      </button>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm"
        // onClick={() => createCourse()}
      >
        Quiz
      </button>
    </div>
  )
}

export default AddItemToCourseForm

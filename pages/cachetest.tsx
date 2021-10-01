import { useMutation } from "@apollo/client";
import { CreateLesson } from "../graphql/mutations/lesson/__generated__/CreateLesson";
import { CREATE_LESSON } from "../graphql/mutations/lesson/CREATE_LESSON";
import { CreateLessonVariables } from "../graphql/mutations/lesson/__generated__/CreateLesson";
import { v4 as uuidv4 } from 'uuid';
import { GetSection } from "../graphql/queries/__generated__/GetSection";
import { GET_SECTION } from "../graphql/queries/allQueries";
import Button from "../components/Button";
import { CREATE_SECTION } from "../graphql/mutations/section/CREATE_SECTION";
import { useState } from "react";
import cache from "../graphql/cache";

const CacheTest = () => {

  const [sectionId, setSectionId] = useState(null)
  const [createSection, newSection] = useMutation(
    CREATE_SECTION,
    {
      onCompleted(data) {
        console.log('createSection completed', data)
        setSectionId(data.createSection.section.id)
      },
    }
  )
  const handleNewSection = () => {
    createSection({
      variables: { 
        title: 'TEST SECTION', 
        content: {},
        // parentIds: [sectionId]
      },
    })
  }

  const handleUpdateSection = () => {
    const data = cache.readQuery<GetSection>({
      query: GET_SECTION,
      variables: { // Provide any required variables here
        id: sectionId,
      },
    })
  
    console.log('Updated section',data)
  }

  return (
    <>
      <Button onClick={handleNewSection}>New Section</Button>
      <Button onClick={handleUpdateSection}>{`Update Section ${sectionId}`}</Button>
    </>
  )
}

export default CacheTest
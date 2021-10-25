import PageTitle from "../components/PageTitle"
import ContentEditor from "../components/ContentEditor/ContentEditor"
import { useState } from "react"

const PlatePage = () => {

  const handleChange = () => false

  return (
    <>
      <PageTitle title="Plate" />
      <ContentEditor content={{blocks: []}} onChange={handleChange} />
    </>
  )
}

export default PlatePage
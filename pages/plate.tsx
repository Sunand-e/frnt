import PageTitle from "../components/PageTitle"
import ContentEditor from "../components/ContentEditor/ContentEditor"
import ContentEditorFull from "../components/ContentEditor/ContentEditorFull"
import EditorLayout from "../layouts/EditorLayout"
import { useContext } from "react"

const PlatePage = () => {

  const handleChange = (newValue) => {
    console.log('changed!')
    console.log(newValue)
  }

  return (
    <>
      <PageTitle title="Plate" />
         {/* <ContentEditor onChange={handleChange} /> */}
      {/* <ContentEditorFull content={{blocks: []}} onChange={handleChange} /> */}
    </>
  )
}

PlatePage.getLayout = page => (
  <EditorLayout
    navState={{}}
    page={page}
  />
)
export default PlatePage
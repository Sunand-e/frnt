import PageTitle from "../components/PageTitle"
import ContentEditor from "../components/ContentEditor/ContentEditor"
import ContentEditorFull from "../components/ContentEditor/ContentEditorFull"
import EditorLayout from "../components/layouts/EditorLayout"
import { ContentContext, ContentContextProvider } from "../context/contentContext"
import { useContext } from "react"

const PlatePage = () => {

  const handleChange = (newValue) => {
    console.log('changed!')
    console.log(newValue)
  }

  return (
    <>
      <PageTitle title="Plate" />
      <ContentContextProvider>
         <ContentEditor onChange={handleChange} />
      {/* <ContentEditorFull content={{blocks: []}} onChange={handleChange} /> */}
      </ContentContextProvider>
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
import PageTitle from "../components/header/PageTitle"
import ContentEditor from "../components/SlateContentEditor/ContentEditor"
import usePageTitle from "../hooks/usePageTitle"

const SlatePage = () => {

  usePageTitle( { title: 'Slate' } )
  return (
    <>
      <ContentEditor />
    </>
  )
}

export default SlatePage
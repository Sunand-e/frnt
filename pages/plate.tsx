import PageTitle from "../components/app/header/PageTitle"
import EditorLayout from "../layouts/EditorLayout"
import { useContext } from "react"
import { MarkBallonToolbar } from "../components/common/plate/Toolbar"
import { Plate } from "@udecode/plate-headless"
import { CONFIG } from "../components/common/plate/config/config"
import usePageTitle from "../hooks/usePageTitle"

const PlatePage = () => {
  
  usePageTitle({ title: 'Plate' })

  const handleChange = (newValue) => {
    console.log('changed!')
    console.log(newValue)
  }

  return (
    <>
      <MarkBallonToolbar />
      <Plate
        id="balloon-toolbar"
        // plugins={}
        editableProps={CONFIG.editableProps}
        initialValue={[{type:'p', children:[{text:'aaa'}]}]}
      />
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
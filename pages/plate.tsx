import PageTitle from "../components/header/PageTitle"
import EditorLayout from "../layouts/EditorLayout"
import { useContext } from "react"
import { MarkBallonToolbar } from "../components/plate/Toolbar"
import { Plate } from "@udecode/plate-headless"
import { CONFIG } from "../components/plate/config/config"
import { PLUGINS } from "../components/plate/config/plugins"
import usePageTitle from "../hooks/usePageTitle"

const PlatePage = () => {
  
  usePageTitle({ title: 'Plate' })

  const handleChange = (newValue) => {
    console.log('changed!')
    console.log(newValue)
  }

  return (
    <>
      <MarkBalloonToolbar />
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
import { Notices } from '../../../components/common/Notices'
import PathwaysTable from '../../../components/pathways/PathwaysTable/PathwaysTable'
import { useContext, useEffect } from 'react'
import { ModalContext } from '../../../context/modalContext'
import usePageTitle from '../../../hooks/usePageTitle'
import useHeaderButtons from "../../../hooks/useHeaderButtons";
import {Add} from "@styled-icons/fluentui-system-filled/Add";


const AddButton = () => (
  <>
    <span className='hidden lg:block'>Create new pathway</span>
    <span className='block lg:hidden'><Add  width="20" /></span>
  </>
)

const AdminPathways = () => {

  usePageTitle({
    title: 'Pathways'
  })

  // const router = useRouter()
  
  const { handleModal, closeModal } = useContext(ModalContext);

  // const handleAddClick = (e) => {
  //   router.push('/admin/pathways/create')
  //   // handleModal({
  //   //   title: `Add new pathway`,
  //   //   // content: <BasicTextInput label="Pathway name" placeholder='Untitled pathway' />,
  //   //   content: <PathwayCreateModalForm />,
  //   //   buttons: null
  //   // })
  // }
  //
  // useEffect(() => {
  //   headerButtonsVar(
  //     <>
  //       <Button onClick={handleAddClick}>Add new pathway</Button>
  //     </>
  //   )
  // },[])

  useHeaderButtons([
    [<AddButton />, '/admin/pathways/create']
  ])

  return (
    <>
      <Notices />
      <PathwaysTable />
    </>
  )
}



AdminPathways.navState = {
  topLevel: 'courses',
  secondary: 'pathways'
}

export default AdminPathways

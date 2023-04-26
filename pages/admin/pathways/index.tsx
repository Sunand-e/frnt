import { Notices } from '../../../components/common/Notices'
import PathwaysTable from '../../../components/pathways/PathwaysTable/PathwaysTable'
import usePageTitle from '../../../hooks/usePageTitle'
import useHeaderButtons from "../../../hooks/useHeaderButtons";
import ButtonAdd from '../../../components/common/ButtonAdd';

const AdminPathways = () => {

  usePageTitle({
    title: 'Pathways'
  })

  // const router = useRouter()
  
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

  useHeaderButtons({
    id: 'createPathway',
    component: <ButtonAdd action='/admin/pathways/create' text='Create new pathway' />
  })

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

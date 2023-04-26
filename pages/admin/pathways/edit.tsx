import usePageTitle from '../../../hooks/usePageTitle'
import { useRouter } from '../../../utils/router'
import useUpdatePathway from '../../../hooks/pathways/useUpdatePathway'
import PathwayEditor from '../../../components/pathways/PathwayEditor'
import useGetPathway from '../../../hooks/pathways/useGetPathway'
import { useSavePathwayButton } from '../../../components/pathways/useSavePathwayButton'

const AdminPathwaysEdit = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
    
  const { pid } = router.query
  const { pathway } = useGetPathway(pid)
  const { updatePathway } = useUpdatePathway(pid)

  // const { updatePathwayTitle } = usePathway(id)

  usePageTitle({ 
    title: "Pathway: ", 
    editable:  pathway?.title, 
    onEdit: title => updatePathway({title})
  })

  useSavePathwayButton()

  return (
    <>
      { pathway && 
        <PathwayEditor />
      }
    </>
  )
}

AdminPathwaysEdit.navState = {
  topLevel: 'courses',
  secondary: 'pathways'
}


export default AdminPathwaysEdit
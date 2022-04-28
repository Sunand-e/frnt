import usePageTitle from '../../../../hooks/usePageTitle'
import { useRouter } from '../../../../utils/router'
import EditorLayout from '../../../../layouts/EditorLayout'
import { headerButtonsVar, viewVar } from '../../../../graphql/cache'
import { useState, useEffect, useContext } from 'react'
import Button from '../../../../components/Button'
import useUpdatePathway from '../../../../hooks/pathways/useUpdatePathway'
import PathwayEditor from '../../../../components/admin/pathways/PathwayEditor'

const AdminPathwaysEdit = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
    
  const { id } = router.query
  const { pathway, updatePathway } = useUpdatePathway(id)

  // const { updatePathwayTitle } = usePathway(id)

  usePageTitle({ 
    title: "Pathway: ", 
    editable:  pathway?.title, 
    onEdit: title => updatePathway({title})
  })

  useEffect(() => {
    headerButtonsVar(
      <>
        <Button onClick={() => router.push('/admin/courses/pathways')}>Cancel</Button>
        <Button onClick={() => router.push({
          pathname: `/pathway`,
          query: {
            id
          }
        })}>
          Preview pathway
        </Button>
        <Button>Publish</Button>
      </>
    )
  },[])

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
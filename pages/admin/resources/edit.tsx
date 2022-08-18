import usePageTitle from '../../../hooks/usePageTitle'
import { useRouter } from '../../../utils/router'
import EditorLayout from '../../../layouts/EditorLayout'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import { useState, useEffect, useContext } from 'react'
import Button from '../../../components/Button'
import useResource from '../../../hooks/resources/useResource'
import useHeaderButtons from '../../../hooks/useHeaderButtons'

const AdminResourcesEdit = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
    
  const { id } = router.query
  
  const { resource, updateResource } = useResource(id)

  // const { updateResourceTitle } = useResource(id)

  usePageTitle({ 
    title: "Library Item: ", 
    editable:  resource?.title,
    onEdit: title => updateResource({title})
  })

  // useEffect(() => {
  //   headerButtonsVar(
  //     <>
  //       <Button onClick={() => router.push('/admin/library')}>Cancel</Button>
  //       <Button onClick={() => router.push({
  //         pathname: `/library_item`,
  //         query: {
  //           id,
  //           showEdit: true
  //         }
  //       })}>
  //         Preview
  //       </Button>
  //       <Button>Publish</Button>
  //     </>
  //   )
  // },[])

  useHeaderButtons([
    ['Cancel','/admin/library'],
    ['Preview', {
      pathname: `/library_item`,
      query: {
        id,
        showEdit: true
      }
    }],
    ['Publish','']
  ])

  return (
    <>
      {/* { updateResource &&
        <ResourceEditor />
      } */}
    </>
  )
}

AdminResourcesEdit.navState = {
  topLevel: 'library',
  secondary: 'library'
}

export default AdminResourcesEdit

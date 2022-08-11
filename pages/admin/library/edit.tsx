import usePageTitle from '../../../hooks/usePageTitle'
import LibraryItemEditor from '../../../components/admin/libraryItems/LibraryItemEditor'
import { useRouter } from '../../../utils/router'
import EditorLayout from '../../../layouts/EditorLayout'
import { headerButtonsVar, viewVar } from '../../../graphql/cache'
import { useState, useEffect, useContext } from 'react'
import Button from '../../../components/Button'
import useLibraryItem from '../../../hooks/libraryItems/useLibraryItem'

const AdminLibraryItemsEdit = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
    
  const { id } = router.query
  
  const { libraryItem, updateLibraryItem } = useLibraryItem(id)

  // const { updateLibraryItemTitle } = useLibraryItem(id)

  usePageTitle({ 
    title: "Library Item: ", 
    editable:  libraryItem?.title, 
    onEdit: title => updateLibraryItem({title})
  })

  useEffect(() => {
    headerButtonsVar(
      <>
        <Button onClick={() => router.push('/admin/library')}>Cancel</Button>
        <Button onClick={() => router.push({
          pathname: `/library_item`,
          query: {
            id,
            showEdit: true
          }
        })}>
          Preview
        </Button>
        <Button>Publish</Button>
      </>
    )
  },[])

  return (
    <>
      { libraryItem && 
        <LibraryItemEditor />
      }
    </>
  )
}

AdminLibraryItemsEdit.navState = {
  topLevel: 'library',
  secondary: 'library'
}

export default AdminLibraryItemsEdit

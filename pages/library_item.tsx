import usePageTitle from '../hooks/usePageTitle'
import { useRouter } from '../utils/router'
import { currentContentItemVar, headerButtonsVar, viewVar } from '../graphql/cache'
import { useState, useEffect } from 'react'
import Button from '../components/Button'
import LibraryItemView from '../components/ContentLibrary/LibraryItemView'

const LibraryItemPage = () => {
  /*
    Our useRouter is a modified version of nextJS's useRouter, as router.query is only available in SSR applications.
    See: https://stackoverflow.com/a/56695180/4274008, https://github.com/vercel/next.js/issues/4804
  */
  const router = useRouter()
  const { id, showEdit=false } = router.query


  const editItem = () => {
    router.push({
      pathname: `/admin/library/edit`,
      query: {
        id
      }
    })
  }

  useEffect(() => {

    headerButtonsVar(
      <>
        {showEdit && <Button onClick={editItem}>Edit Item</Button> }
      </>
    )
  },[showEdit])
  return (
    <>
    <LibraryItemView id={id} />
    </>
  )
}

LibraryItemPage.navState = {
  topLevel: 'library',
  secondary: 'overview'
}
export default LibraryItemPage
import { useRef, useEffect, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import { useBlockStore } from '../components/common/ContentEditor/useBlockStore'
import { ModalContext } from '../context/modalContext'

// Scroll position management
export default function useRouteChange() {
  const router = useRouter()
  const retainedComponents = useRef<{ [url: string]: number }>({})

  const isDirty = useBlockStore(state => state.isDirty)

  const { handleModal, closeModal } = useContext(ModalContext)

  const handleRouteChangeStart = useCallback((url: string) => {
    handleModal({
      content: 'da'
    })
  },[isDirty])

  useEffect(() => {
    // Save the scroll position of current page before leaving but you can do what you want

  
    // Scroll to the saved position but you can do what you want
    const onRouteChangeComplete = (url: string) => {
      if (retainedComponents.current[router.asPath]) {
        window.scrollTo(0, retainedComponents.current[router.asPath])
      }
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on("routeChangeComplete", onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [router.asPath, handleRouteChangeStart])
}
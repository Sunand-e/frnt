import { createStore, useStore } from 'zustand'
import { createContext, useContext, useRef } from 'react'

interface Items {
  [key:string]: Array<string>
}

type StructureProps = {
  items: Items,
  sectionIds: Array<string>
  clonedItems?: Items
}

interface StructureState extends StructureProps {
  setItems: (items: StructureProps['items']) => void
  setSectionIds: (sectionIds: StructureProps['sectionIds']) => void
  setClonedItems: (clonedItems: StructureProps['clonedItems']) => void
}

type StructureStore = ReturnType<typeof createStructureStore>

const createStructureStore = (initProps?: Partial<StructureProps>) => {
  initProps
  const DEFAULT_PROPS: StructureProps = {
    items: {},
    sectionIds: [],
    clonedItems: {}
  }
  return createStore<StructureState>()((set) => {

    return ({
    ...DEFAULT_PROPS,
    ...initProps,
    setItems: (items) => {
      return set(() => ({ items: items }))
    },
    setClonedItems: (clonedItems) => set(() => ({ clonedItems: clonedItems })),
    setSectionIds: (sectionIds) => set(() => ({ sectionIds: sectionIds })),
  })
})
}


export const StructureContext = createContext<StructureStore | null>(null)

function useStructureContext<T>(
  selector: (state: StructureState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(StructureContext)
  if (!store) throw new Error('Missing StructureContext.Provider in the tree')
  return useStore(store, selector, equalityFn)
}

type StructureProviderProps = React.PropsWithChildren<StructureProps>

function StructureProvider({ children, ...props }: StructureProviderProps) {
  const storeRef = useRef<StructureStore>()
  if (!storeRef.current) {
    console.log("There's not a current ref to the store")
    storeRef.current = createStructureStore(props)
  } else {
    storeRef.current.setState(s => props)
  }
  return (
    <StructureContext.Provider value={storeRef.current}>
      {children}
    </StructureContext.Provider>
  )
}

export { 
  useStructureContext,
  StructureProvider
}
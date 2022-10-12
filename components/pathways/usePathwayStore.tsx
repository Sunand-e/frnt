import create from 'zustand'

type PathwayState = {
  isDirty: boolean
  items: any[]
  setIsDirty: (isDirty) => void
  editItems: (items) => void
  setItems: (items) => void
  addItem: (item) => void
  removeItem: (item) => void
}

export const usePathwayStore = create<PathwayState>(set => ({
  isDirty: false,
  setIsDirty: (isDirty) => set(state => ({ isDirty })),
  items: [],
  setItems: (items) => set(state => ({ items, isDirty: false })),
  editItems: (items) => set(state => ({ items, isDirty: true })),
  addItem: (item) => set(state => ({ items: [...state.items, item], isDirty: true })),
  removeItem: (item) => set(state => ({ 
    items: state.items.filter(i => i.id !== item.id), 
    isDirty: true
  }))
}))

export const getItem = (id) => {
  const { items } = usePathwayStore.getState()
  return items.find(b => b.id === id)
}

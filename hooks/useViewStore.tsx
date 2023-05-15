import { ReactNode } from 'react'
import create from 'zustand'

type HeaderButton = {
  id: string
  component: ReactNode
  order: number
  action: string | (() => void)
}

type ViewState = {
  isAdminView: boolean
  showSecondaryNav: boolean
  isSlimNav: boolean
  headerButtons: Array<HeaderButton>
}

const initialState: ViewState = {
  isAdminView: false,
  showSecondaryNav: false,
  isSlimNav: false,
  headerButtons: []
}
export const useViewStore = create<ViewState>(set => ({
  ...initialState
}))

export const resetViewStore = () => {
  useViewStore.setState(initialState)
}
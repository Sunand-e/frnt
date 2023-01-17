import { FC, ReactNode } from "react"
import create from "zustand"

interface TableState {
  modalTitle?: string | null,
  modalButtons?: ReactNode | null,
  modalContent?: ReactNode | null,
  modalSize?: string | null
} 
interface TableState {
  activeTable?: boolean,
  tables?: [],
} 

export const useModalStore = create<TableState>(set => ({
  activeTable: false,
  tables: []
}))


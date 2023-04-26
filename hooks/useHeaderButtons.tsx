import produce from "immer"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useViewStore } from "./useViewStore"

const useHeaderButtons = (buttons) => {
  useEffect(() => {
    let buttonsArray
    if(buttons) {
      if(!(buttons instanceof Array)) {
        buttonsArray = [buttons]
      } else {
        buttonsArray = buttons
      }
    }
    if(buttonsArray) {
      useViewStore.setState(state => ({
        headerButtons: produce(state.headerButtons, draft => {
          for(let button of buttonsArray) {
            const buttonIndex = state.headerButtons.findIndex(b => b.id === button.id)
            if(buttonIndex === -1) {
              draft.push(button)
            } else {
              draft[buttonIndex] = button
            }
          }
        })
      }))
    }
    return () => {
      useViewStore.setState(state => {
        const headerButtons = state.headerButtons.filter(hb => !buttonsArray.map(b => b.id).includes(hb.id))
        return {
            headerButtons
          }
        }   
      )
    }
  },[buttons])

}

export default useHeaderButtons

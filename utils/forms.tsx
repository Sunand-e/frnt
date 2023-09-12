export const disableSubmitOnEnterKey = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault()
  }
}
const NewThingButton = ({thing, onClick}) => {

  return (
    <div className="
      text-center align-center p-2
      border-2 border-dashed border-grey hover:border-grey-dark 
      text-grey hover:text-grey-dark
      hover:cursor-pointer
      w-full flex-none flex flex-col justify-center
    ">
      <div
      className="flex space-x-3 justify-center"
      onClick={onClick}
      >
        {/* <Icon icon="plus-alt" /> */}
        <span>New {thing}</span>
      </div>
    </div>
  )
}

export default NewThingButton
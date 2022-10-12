import NewThingButton from "./NewThingButton";

const NewSectionButton = ({onClick}) => {

  return (
    <div className="px-5">
      <NewThingButton thing="Section" onClick={onClick} />
    </div>
  )
}

export default NewSectionButton
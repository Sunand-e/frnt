import Button from "./Button";

function SaveButton({onClick}) {
  const className = "px-8"
  return (
      <Button className={className} onClick={onClick}>Save</Button>
  );
}

export default SaveButton
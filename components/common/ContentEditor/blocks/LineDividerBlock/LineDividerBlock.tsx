import LineDivider from '../../../dividers/LineDivider'

export const LineDividerBlock = ({block}) => {

  const properties = block.properties
  return (
    <>
      <LineDivider properties={properties} />
    </>
  );
}

export default LineDividerBlock
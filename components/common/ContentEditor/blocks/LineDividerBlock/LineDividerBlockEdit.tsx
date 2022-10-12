import LineDivider from '../../../dividers/LineDivider';

const LineDividerBlockEdit = ({block}) => {

  const properties = block.properties

  return (
    <>
      <LineDivider properties={properties} />
    </>
  )
}

export default LineDividerBlockEdit

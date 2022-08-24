import LineDivider from '../../../common/dividers/LineDivider';

const LineDividerBlockEdit = ({block}) => {

  const properties = block.properties

  return (
    <>
      <LineDivider properties={properties} />
    </>
  )
}

export default LineDividerBlockEdit

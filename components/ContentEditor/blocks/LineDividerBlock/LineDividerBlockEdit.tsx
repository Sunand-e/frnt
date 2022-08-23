import LineDivider from '../../../common/dividers/LineDivider';

const LineDividerBlockEdit = ({block}) => {

  const properties = block.properties

  return (
    <>
      <pre>
        { JSON.stringify(block,null,2) }
      </pre>
      <LineDivider properties={properties} />
    </>
  )
}

export default LineDividerBlockEdit

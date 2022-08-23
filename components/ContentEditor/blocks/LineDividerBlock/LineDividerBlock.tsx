import LineDivider from '../../../common/dividers/LineDivider'

export const LineDividerBlock = ({block}) => {

  const properties = block.properties
  return (
    <>
      <pre>
      { JSON.stringify(block,null,2) }
      </pre>
      <LineDivider properties={properties} />
    </>
  );
}

export default LineDividerBlock
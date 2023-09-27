import LineDivider from '../../../dividers/LineDivider'

export const LineDividerBlock = ({block}) => {

  const style = block.style
  return (
    <>
      <LineDivider style={style} />
    </>
  );
}

export default LineDividerBlock
import LineWithIcon from '../../common/LineWithIcon'

const BlockFooter = ({block}) => {

  return (
    <>
      <div
        className={`text-main opacity-0 max-w-screen-lg self-center group-hover:opacity-100 w-full`}
        // onClick={() => setShowBlockSelector(!showBlockSelector)}
        >
        <LineWithIcon />
      </div>
    </>
  );
}

export default BlockFooter
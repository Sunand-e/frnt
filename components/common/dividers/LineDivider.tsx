const LineDivider = ({style}) => (
  <div className="relative flex py-5 items-center">
    <div 
      className='flex-grow border-t border-gray-400'
      style={{
        ...(style?.color && {borderColor: style.color}),
        ...(style?.height && {borderWidth: style.height}),
      }}
    />
  </div>
)

export default LineDivider
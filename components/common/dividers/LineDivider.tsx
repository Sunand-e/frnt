const LineDivider = ({properties}) => (
  <div className="relative flex py-5 items-center">
    <div 
      className='flex-grow border-t border-gray-400'
      style={{
        ...(properties.color && {borderColor: properties.color}),
        ...(properties.height && {borderWidth: properties.height}),
      }}
    />
  </div>
)

export default LineDivider
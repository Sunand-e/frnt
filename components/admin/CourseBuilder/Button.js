const Button = ({onClick, className, children}) => (
  <button 
    className={`${className} border-2 border-blue text-main-secondary uppercase p-2 font-semibold`}
    onClick={onClick}
  >
    {children}
  </button>
)
export default Button

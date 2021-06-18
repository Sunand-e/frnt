const Button = ({onClick, children}) => (
  <button className="h-8 bg-main rounded-full font-base text-base px-8 text-white" onClick={onClick}>{children}</button>
)
export default Button
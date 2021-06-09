const button = ({onClick, children}) => (
  <button className="border-2 border-blue text-main-dark uppercase p-2 font-semibold" onClick={onClick}>{children}</button>
)
export default button